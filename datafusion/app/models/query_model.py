from ..database.db import db

class Query(db.Model):
    __tablename__ = 'queries'

    id = db.Column(db.Integer, primary_key=True)
    queryName = db.Column(db.String(256), unique=True, nullable=False) 
    queryDescription = db.Column(db.String(1024))
    executionUnitFunction = db.Column(db.String)

    def to_dict(self):
        return {
            "id": self.id,
            "queryName": self.queryName,
            "queryDescription": self.queryDescription,
            "executionUnitFunction": self.executionUnitFunction
        }