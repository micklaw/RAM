@echo off
setlocal EnableDelayedExpansion

set filename=project-image

call :treeProcess
goto :eof

:treeProcess
set suffix=0
for %%f in (*.jpeg) do (
   set /A suffix+=1
   echo "%%f -> %filename%-!suffix!.jpeg"
   ren "%%f" "%filename%-!suffix!.jpeg"
)
for /D %%d in (*) do (
    cd %%d
    echo %%d
    call :treeProcess
    cd ..
)
exit /b