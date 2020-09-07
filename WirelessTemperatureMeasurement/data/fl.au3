#include <Array.au3>
#include <File.au3>
$aList = _FileListToArray(@ScriptDir)
$sRet = ""
For $i = 1 To $aList[0]
	$sRet &= @TAB&'server.on("/'&$aList[$i]&'", [](){handleReadFile("/'&$aList[$i]&'");});'&@CRLF
Next
;MsgBox(0,'',$sRet)
ClipPut($sRet)