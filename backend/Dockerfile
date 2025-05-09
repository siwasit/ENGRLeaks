# Use an official Python image
FROM python:3.10-slim

# Set the working directory
WORKDIR /app

# Copy the backend code
COPY . /app

# Install dependencies in a non-shared directory
RUN python -m venv /opt/venv && \
    /opt/venv/bin/pip install --upgrade pip && \
    /opt/venv/bin/pip install --no-cache-dir -r requirements.txt

# Expose the port
EXPOSE 8000

# Run the Django server
CMD ["/opt/venv/bin/python", "backend_app/manage.py", "runserver", "0.0.0.0:8000"]