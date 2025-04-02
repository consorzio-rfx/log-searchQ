from ..database.db import db
from sqlalchemy.dialects.postgresql import ARRAY

class Query(db.Model):
    __tablename__ = 'queries'

    id = db.Column(db.Integer, primary_key=True)
    queryName = db.Column(db.String(256), unique=True, nullable=False)
    dependencies = db.Column(ARRAY(db.String(256)), nullable=False)
    queryDescription = db.Column(db.String(1024))
    executionUnitFunction = db.Column(db.String)

    def to_dict(self):
        return {
            "id": self.id,
            "queryName": self.queryName,
            "dependencies": ", ".join(self.dependencies),
            "queryDescription": self.queryDescription,
            "executionUnitFunction": self.executionUnitFunction
        }