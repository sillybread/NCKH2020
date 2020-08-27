#include <ESP8266WiFi.h>
#include <WiFiClient.h>
#include <ESP8266WebServer.h>
#include <ESP8266mDNS.h>
#include <EEPROM.h>
#include "FS.h"
#include <OneWire.h>
#include <DallasTemperature.h>
#include <ArduinoJson.h>

#define ON LOW
#define OFF HIGH

int ONE_WIRE_BUS = 2;
String ssid = "";
String password = "";
int led = 2;
int iDelay = 0;

OneWire oneWire;
DallasTemperature sensors;
DeviceAddress insideThermometer;

ESP8266WebServer server(80);

String readStr(int iAddr, int iCount){
  String sResult;
  char cSingle;
  for (int ii=0;ii<iCount;ii++){
    cSingle = EEPROM.read(ii+iAddr);
    if (!cSingle) break;
    sResult += cSingle;
  }
  return sResult;
}

int readInt(int iAddr, int iCount){
  int iResult = 0;
  for (int ii=iCount-1;ii>=0;ii--){
    iResult += EEPROM.read(ii+iAddr)*pow(256,ii);
  }
  return iResult;
}

void handleDumpEEP(){
  String sResponse, s32 = "";
  int i4=0, i32=0;
  byte iRecv;
  char aBuff[2];
  
  for (int ii=0;ii<4096;ii++){
      iRecv = EEPROM.read(ii);
      i32++;i4++;
      sprintf(aBuff, "%02X", iRecv);
      sResponse += String(aBuff);
      s32 += (char)((iRecv==13||iRecv==10)?'.':iRecv);
      if (i4==4){
        sResponse += " ";
        i4=0;
      }
      if (i32==32){
        sResponse += "    " + s32;
        sResponse += "\n";
        s32 = ""; i32 = 0;
      }
  }
  server.send(200, "text/html", "<html><pre>"+sResponse+"</pre></html>");
}

void handleRestart(){
  server.send(200, "text/plain", "Rebooting server...");
  delay(1000);
  ESP.reset();
}

void handleWrite(){
  String sType = server.arg("type");
  String sData = server.arg("data");
  int iAddr = server.arg("address").toInt();
  int iCount = server.arg("count").toInt();

  if (sType=="String"){
    int len = sData.length();
    for (int ii=0;ii<iCount;ii++){
      EEPROM.write(ii+iAddr, (ii<len)?sData.charAt(ii):0);
    }
  } else {
    int iTemp = sData.toInt();
    for (int ii=0;ii<iCount;ii++){
      EEPROM.write(ii+iAddr, (iTemp>0)?iTemp%256:0);
      iTemp /= 256;
    }
  }
  Serial.println("handleWrite "+String((EEPROM.commit())?"OK!":"ERROR!!!"));
  server.send(200, "text/plain", "OK");
}

void handleRead(){
  String sType = server.arg("type");
  int iAddr = server.arg("address").toInt();
  int iCount = server.arg("count").toInt();
  if (sType=="String"){
      server.send(200, "text/plain", readStr(iAddr, iCount));
  } else {
      server.send(200, "text/plain", String(readInt(iAddr, iCount)));
  }
}


void handleReadFile(String fileName){
    File f = SPIFFS.open("/index.htm","r");
    Serial.println("file open "+String((f!=NULL)?"success":"failed"));
    
    String sContent;
    while (f.available()){
      sContent += (char)f.read();
    }
    f.close();
    server.send(200,"text/html",sContent);
}


void handleNotFound() {
  digitalWrite(led, ON);
  String message = "File Not Found\n\n";
  message += "URI: ";
  message += server.uri();
  message += "\nMethod: ";
  message += (server.method() == HTTP_GET) ? "GET" : "POST";
  message += "\nArguments: ";
  message += server.args();
  message += "\n";
  for (uint8_t i = 0; i < server.args(); i++) {
    message += " " + server.argName(i) + ": " + server.arg(i) + "\n";
  }
  server.send(404, "text/plain", message);
  digitalWrite(led, OFF);
}

void handleRoot(){
  handleReadFile("/index.htm");
}

void handleQuery(){
  String sKeyword = server.arg("kw");
  DynamicJsonDocument jRet(2048);
  if (sKeyword == "settings"){
    
  } else {
    
  }
}

void handleSensor(){
  sensors.requestTemperatures(); 
  float fTempC = sensors.getTempC(insideThermometer);
  if (fTempC < -126.00){//If device error
    sensors.getAddress(insideThermometer, 0);
    sensors.setResolution(insideThermometer, 9);
  }
  //Serial.println("Get temperature success: "+String(fTempC));
  server.send(200,"text/plain", String(fTempC));
}

void loadSettings(){
  oneWire = OneWire(ONE_WIRE_BUS);
  sensors = DallasTemperature(&oneWire);
  ssid = readStr(0, 32);
  Serial.println("Loadded ssid: "+ssid);
  password = readStr(32, 32);
  Serial.println("Loadded pswd: "+password);
  iDelay = readInt(394, 6);
  Serial.println("Loadded iDelay: "+iDelay);
}

void setup(void) {
  Serial.begin(115200);
  EEPROM.begin(4096);
  Serial.println("");
  loadSettings();
  SPIFFS.begin();
  sensors.begin();
  
  pinMode(led, OUTPUT);
  digitalWrite(led, OFF);
  
  WiFi.mode(WIFI_AP_STA);
  WiFi.begin(ssid, password);

  int iCounter = 0;
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
    iCounter++;
    if (iCounter==10) break;
  }
  Serial.println();
  
  if (iCounter==10){
	  Serial.println("Connect failed! Starting softAP");
	  WiFi.softAP("ConnectME", "12341234");
    Serial.print("AP IP: ");
    Serial.println(WiFi.softAPIP());
  } else {
    Serial.println("Connected to "+ssid);
    Serial.print("IP address: ");
    Serial.println(WiFi.localIP());
  }

  if (MDNS.begin("esp8266")) {
    Serial.println("MDNS responder started");
  }
  server.on("/", handleRoot);
  server.on("/write", handleWrite);
  server.on("/read", handleRead);
  server.on("/eep", handleDumpEEP);
  server.on("/rs", handleRestart);
  server.on("/sensor", handleSensor);
  server.onNotFound(handleNotFound);

  server.begin();
  Serial.println("HTTP server started");
}

void loop(void) {
  server.handleClient();
  MDNS.update();
  delay(iDelay);
}
