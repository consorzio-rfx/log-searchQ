from ..database.db import db
from sqlalchemy import UniqueConstraint, Index
from sqlalchemy.dialects.postgresql import JSONB

class Execution(db.Model):
    __tablename__ = 'executors'

    id = db.Column(db.Integer, primary_key=True)
    executorName = db.Column(db.String, nullable=False)
    executorInput = db.Column(JSONB, nullable=False)
    executorOutput = db.Column(db.JSON, nullable=False)
    __table_args__ = (UniqueConstraint('executorName', 'executorInput', name='unique_executorName_executorInput'),
                      Index('ix_executor_input', executorInput, postgresql_using='gin'))

    def to_dict(self):
        return {
            "id": self.id,
            "executorName": self.executorName,
            "executorInput": self.executorInput,
            "executorOutput": self.executorOutput
        }