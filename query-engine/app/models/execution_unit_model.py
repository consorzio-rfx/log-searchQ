from ..database.db import db
from sqlalchemy import UniqueConstraint

class ExecutionUnit(db.Model):
    __tablename__ = 'execution_units'

    id = db.Column(db.Integer, primary_key=True)
    queryName = db.Column(db.String(256), db.ForeignKey('queries.queryName', ondelete="CASCADE"), nullable=False)
    shot = db.Column(db.Integer, nullable=False)
    result = db.Column(db.LargeBinary, nullable=False) 

    __table_args__ = (UniqueConstraint('queryName', 'shot', name='unique_queryName_shot'),)

    def to_dict(self):
        return {
            "id": self.id,
            "queryName": self.queryName,
            "shot": self.shot,
            # "result": self.result
        }