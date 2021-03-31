#!/bin/bash
echo "Starting database setup script"
echo "NOTICE: Ensure a postgresql server is running and that you have psql installed"

# Create role with superuser privileges
sudo -u postgres psql -c "CREATE USER group arrangement WITH PASSWORD 'testpassword';"
sudo -u postgres psql -c "ALTER USER group arrangement WITH SUPERUSER;"

# Create database
sudo -u postgres psql -c "CREATE DATABASE group arrangement_development;"
