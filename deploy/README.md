# AidlyAI Server Deploy

This site is a static Vite/React build served by Nginx.

The outreach agent is local-only and must not be deployed.

## 1. On the server, create the site folder

```bash
sudo mkdir -p /var/www/aidlyai.com/releases
sudo mkdir -p /var/www/aidlyai.com/current
sudo chown -R $USER:www-data /var/www/aidlyai.com
```

## 2. Clone or pull the repo

Recommended location:

```bash
mkdir -p ~/sites
cd ~/sites
git clone https://github.com/credens/aidlyAI.git aidlyAI
cd aidlyAI
```

For later updates:

```bash
cd ~/sites/aidlyAI
git pull origin main
```

## 3. Install and build

```bash
npm ci
npm run build
```

The build output will be in:

```text
dist/
```

## 4. Publish the build

Use a timestamped release folder:

```bash
RELEASE=$(date +%Y%m%d%H%M%S)
mkdir -p /var/www/aidlyai.com/releases/$RELEASE
rsync -av --delete dist/ /var/www/aidlyai.com/releases/$RELEASE/
ln -sfn /var/www/aidlyai.com/releases/$RELEASE /var/www/aidlyai.com/current
```

## 5. Add the Nginx site

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

## 6. DNS

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

## 7. SSL with Certbot

After DNS points to the server:

```bash
sudo certbot --nginx -d aidlyai.com -d www.aidlyai.com
```

Choose redirect HTTP to HTTPS when prompted.

## Update deploy command

For future updates:

```bash
cd ~/sites/aidlyAI
git pull origin main
npm ci
npm run build
RELEASE=$(date +%Y%m%d%H%M%S)
mkdir -p /var/www/aidlyai.com/releases/$RELEASE
rsync -av --delete dist/ /var/www/aidlyai.com/releases/$RELEASE/
ln -sfn /var/www/aidlyai.com/releases/$RELEASE /var/www/aidlyai.com/current
sudo nginx -t
sudo systemctl reload nginx
```
