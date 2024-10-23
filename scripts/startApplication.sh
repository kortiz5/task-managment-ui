#!/bin/bash

echo "🔥🔥Iniciando la aplicación Angular..."
ng serve &


echo "⭐⭐Iniciando el servidor Node.js..."
cd ../task-managment-mngr || exit
npm run start
