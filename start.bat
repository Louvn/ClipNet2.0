@echo off

cd frontend\app

echo ClipNet ^> Installing node_modules...
call npm install

echo ClipNet ^> Building Optimized Production React App...
call npm run build
if %errorlevel% neq 0 exit /b %errorlevel%

echo ClipNet ^> Copying build into /backend/react-build...
if not exist ..\..\backend\react-build mkdir ..\..\backend\react-build
xcopy build ..\..\backend\react-build /E /I /Y

cd ..\..

echo ClipNet ^> Installing Python Requirements...
py -3 -m pip install --upgrade pip
py -3 -m pip install -r backend\requirements.txt

echo ClipNet ^> Starting FastAPI...
py -3 -m uvicorn backend:app

pause