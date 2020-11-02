#include <ArduinoJson.h>
#include <ESP8266WiFi.h>
#include <PubSubClient.h>

// Cập nhật thông tin
// Thông tin về wifi
#define ssid "QUA_MANH"
#define password "khansaudoi"
// Thông tin về MQTT Broker
#define mqtt_server "maqiatto.com" // Thay bằng thông tin của bạn
#define mqtt_topic_pub "tranvikhan@gmail.com/demo"   //Giữ nguyên nếu bạn tạo topic tên là demo
#define mqtt_topic_sub "tranvikhan@gmail.com/demo"
#define mqtt_user "tranvikhan@gmail.com"    //Giữ nguyên nếu bạn tạo user là esp8266 và pass là 123456
#define mqtt_pwd "123456"


#include <OneWire.h>
#include <DallasTemperature.h>

#define ONE_WIRE_BUS D4

OneWire oneWire(ONE_WIRE_BUS);
DallasTemperature sensor(&oneWire);
const uint16_t mqtt_port = 1883; //Port của CloudMQTT
const byte ledPin = BUILTIN_LED;

WiFiClient espClient;
PubSubClient client(espClient);

long lastMsg = 0;
char msg[50];
int value = 0;

void setup() {
  Serial.begin(115200);
  setup_wifi();
  client.setServer(mqtt_server, mqtt_port); 
  client.setCallback(callback);
  pinMode(ledPin, OUTPUT);
  
  sensor.begin();
}

// Hàm kết nối wifi
void setup_wifi() {
  delay(10);
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
}

// Hàm call back để nhận dữ liệu
void callback(char* topic, byte* payload, unsigned int length) {
  Serial.print("Message arrived [");
  Serial.print(topic);
  Serial.print("] ");
  for (int i = 0; i < length; i++) {
    char receivedChar = (char)payload[i];
    Serial.print(receivedChar);
    if (receivedChar == '1')
      // Kiểm tra nếu tin nhận được là 1 thì bật LED và ngược lại
      digitalWrite(ledPin, HIGH);
    if (receivedChar == '0')
      digitalWrite(ledPin, LOW);
  }
  Serial.println();
}

// Hàm reconnect thực hiện kết nối lại khi mất kết nối với MQTT Broker
void reconnect() {
  // Chờ tới khi kết nối
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    // Thực hiện kết nối với mqtt user và pass
    if (client.connect("ESP8266Client",mqtt_user, mqtt_pwd)) {
      Serial.println("connected");
      // Khi kết nối sẽ publish thông báo
      client.publish(mqtt_topic_pub, "ESP_reconnected");
      // ... và nhận lại thông tin này
      client.subscribe(mqtt_topic_sub);
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      // Đợi 5s
      delay(5000);
    }
  }
}

void loop() {
  // Kiểm tra kết nối
  if (!client.connected()) {
    reconnect();
  }
  //client.loop();
  sensor.requestTemperatures();

  StaticJsonDocument<300> JSONbuffer;
  JsonObject JSONencoder = JSONbuffer.createObject();
 
  JSONencoder["deviceID"] = "ESP32";
  JSONencoder["Temperature"] = sensor.getTempC();
  JSONencoder["Battery"] = 100;

  char JSONmessageBuffer[100];
  JSONencoder.printTo(JSONmessageBuffer, sizeof(JSONmessageBuffer));
  Serial.println(JSONmessageBuffer);
 
  client.publish(mqtt_topic_pub,JSONmessageBuffer);
  delay(30000);//30 s
}
