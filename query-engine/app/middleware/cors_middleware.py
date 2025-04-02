from flask import request, jsonify

class CORSMiddleware:
    def __init__(self, app, allowed_origins=None, allowed_methods=None, allowed_headers=None):
        self.app = app
        self.allowed_origins = allowed_origins or ["*"]
        self.allowed_methods = allowed_methods or ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
        self.allowed_headers = allowed_headers or ["Content-Type", "Authorization"]

        # Register the middleware
        self.app.before_request(self.before_request)
        self.app.after_request(self.after_request)

    def before_request(self):
        # Handle preflight requests
        if request.method == "OPTIONS":
            response = jsonify()
            self._add_cors_headers(response)
            return response

    def after_request(self, response):
        # Add CORS headers to all responses
        self._add_cors_headers(response)
        return response

    def _add_cors_headers(self, response):
        # Add CORS headers to the response
        response.headers["Access-Control-Allow-Origin"] = ", ".join(self.allowed_origins)
        response.headers["Access-Control-Allow-Methods"] = ", ".join(self.allowed_methods)
        response.headers["Access-Control-Allow-Headers"] = ", ".join(self.allowed_headers)
        response.headers["Access-Control-Allow-Credentials"] = "true"
