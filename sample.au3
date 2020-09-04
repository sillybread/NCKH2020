$x = 0
$y = 0
$z = 0
$c = 0
$fF = FileOpen("sample.txt",2)
For $iz = 0 To 6
	For $iy = 0 To 4
		For $ix = 0 To 2
			FileWrite($fF,StringFormat("%d\t%d\t%d\t%d\n",$x,$y,$z,$c))
			limCheck($x,2)
			limCheck($c,999999999)
		Next
		limCheck($y,4)
	Next
	limCheck($z,6)
Next

Func limCheck(ByRef $in, $lim)
	If $in < $lim Then
		$in += 1
	Else
		$in = 0
	EndIf
EndFunc