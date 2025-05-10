import os
import sys

# Add this at the top of wsgi.py
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend_app.settings')
application = get_wsgi_application()