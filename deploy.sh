#!/bin/bash

tar --exclude=.git* -czvf pledge-dashboard.tar.gz dist/
scp pledge-dashboard.tar.gz devops:/data/tmp
ssh -t devops "sudo rm -rf /data/www/pledge-dashboard && sudo mkdir /data/www/pledge-dashboard && sudo tar -xzf /data/tmp/pledge-dashboard.tar.gz -C /data/www/pledge-dashboard && sudo chown -R www-data:ubuntu /data/www/pledge-dashboard"