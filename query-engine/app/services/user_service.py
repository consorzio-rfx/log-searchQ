from ..models.user_model import User
from ..database.db import db

class UserService:
    @staticmethod
    def get_all_users():
        return User.query.all()

    @staticmethod
    def create_user(data):
        try:
            # Create a new User object
            user = User(username=data['username'], email=data['email'])

            # Add the user to the session
            db.session.add(user)

            # Commit the transaction
            db.session.commit()

            # Return the created user
            return user

        except Exception as e:
            # Handle any other unexpected errors
            db.session.rollback()  # Rollback the transaction
            raise ValueError(f"An unexpected error occurred: {str(e)}")
