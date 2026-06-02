# AidlyAI Server Deploy

This site is a Vite/React build served by Nginx, plus a local Node API for audit request emails.

The outreach agent is local-only and must not be deployed.

## 1. On the server, create the site folder

```bash
sudo mkdir -p /var/www/aidlyai.com/releases
sudo mkdir -p /var/www/aidlyai.com/current
sudo chown -R $USER:www-data /var/www/aidlyai.com
```

## 2. Clone or pull the repo

Recommended location on your current VPS:

```bash
cd ~
git clone https://github.com/credens/aidlyAI.git aidlyAI
cd aidlyAI
```

For later updates:

```bash
cd ~/aidlyAI
git pull origin main
```

## 3. Configure environment

Create `/root/aidlyAI/.env.production` on the server. Do not commit this file.

```bash
cat > /root/aidlyAI/.env.production <<'EOF'
VITE_AUDIT_ENDPOINT=/api/audit-request

AUDIT_API_PORT=3011
AUDIT_TO_EMAIL=federico@aidlyai.com
AUDIT_RATE_LIMIT=12

SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=federico@aidlyai.com
SMTP_PASS=YOUR_GOOGLE_APP_PASSWORD
SMTP_FROM="AidlyAI Website <federico@aidlyai.com>"
EOF
```

For Google Workspace/Gmail SMTP, use an app password or Workspace SMTP credentials. Do not use your normal Google password.

## 4. Install and build

```bash
npm ci
npm run build
```

The build output will be in:

```text
dist/
```

## 5. Publish the build

Use a timestamped release folder:

```bash
RELEASE=$(date +%Y%m%d%H%M%S)
mkdir -p /var/www/aidlyai.com/releases/$RELEASE
rsync -av --delete dist/ /var/www/aidlyai.com/releases/$RELEASE/
ln -sfn /var/www/aidlyai.com/releases/$RELEASE /var/www/aidlyai.com/current
```

## 6. Add the Nginx site

Copy the Nginx config:

```bash
sudo cp deploy/nginx-aidlyai.com.conf /etc/nginx/sites-available/aidlyai.com
sudo ln -s /etc/nginx/sites-available/aidlyai.com /etc/nginx/sites-enabled/aidlyai.com
```

If another config already handles `aidlyai.com`, remove or edit the duplicate `server_name`.

Then test and reload:

```bash
sudo nginx -t
sudo systemctl reload nginx
```

## 7. Install the audit email API service

```bash
sudo cp deploy/aidly-audit-api.service /etc/systemd/system/aidly-audit-api.service
sudo systemctl daemon-reload
sudo systemctl enable --now aidly-audit-api
sudo systemctl status aidly-audit-api --no-pager
```

Test the local health endpoint:

```bash
curl -sS http://127.0.0.1:3011/health
```

## 8. DNS

Point the domain to your server IP:

```text
A     @      YOUR_SERVER_IPV4
A     www    YOUR_SERVER_IPV4
```

If using IPv6:

```text
AAAA  @      YOUR_SERVER_IPV6
AAAA  www    YOUR_SERVER_IPV6
```

## 9. SSL with Certbot

After DNS points to the server:

```bash
sudo certbot --nginx -d aidlyai.com -d www.aidlyai.com
```

Choose redirect HTTP to HTTPS when prompted.

## Update deploy command

For future updates:

```bash
cd ~/aidlyAI
git pull origin main
npm ci
npm run build
RELEASE=$(date +%Y%m%d%H%M%S)
mkdir -p /var/www/aidlyai.com/releases/$RELEASE
rsync -av --delete dist/ /var/www/aidlyai.com/releases/$RELEASE/
ln -sfn /var/www/aidlyai.com/releases/$RELEASE /var/www/aidlyai.com/current
sudo nginx -t
sudo systemctl reload nginx
sudo systemctl restart aidly-audit-api
```
