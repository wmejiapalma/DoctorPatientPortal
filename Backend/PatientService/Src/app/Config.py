from dotenv import load_dotenv
import os
import redis
load_dotenv()


class ApplicationConfig():
    SECRET_KEY = os.getenv('SECRET_KEY')
    SESSION_TYPE = "redis"
    SESSION_PERMANENT = False
    SESSION_USE_SIGNER = True
    SESSION_REDIS = redis.from_url(os.getenv('REDIS_URL'))
    CORS_HEADERS = 'Content-Type'