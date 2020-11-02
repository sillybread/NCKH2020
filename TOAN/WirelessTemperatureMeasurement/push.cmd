echo off
cls
if "%1"=="" (
  set /P commitMessage="Enter commit message: "
) else (
  set commitMessage=%1
)
git add .
git commit -m "%commitMessage%"
git push origin master -f