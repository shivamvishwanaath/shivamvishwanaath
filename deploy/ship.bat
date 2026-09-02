@echo off
:: Automated shipping script from local machine to VPS
echo ====================================================
echo  Shipping latest commits to remote ^& triggering VPS
echo ====================================================

echo 1. Pushing local commits to Git origin...
git push origin main

echo 2. SSHing into VPS to execute build and deploy script...
ssh root@shivamvishwanaath.dev "bash /var/www/shivam-vishwanaath/deploy/deploy.sh"

echo ====================================================
echo  Shipment Complete!
echo ====================================================
pause
