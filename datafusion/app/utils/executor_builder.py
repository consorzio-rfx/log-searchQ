from .executor import ExecutorRegistry

class ExecutorBuilder:
    @staticmethod
    def buildStdPathInput(path):
        return {"path": path}

    @staticmethod
    def buildStdShotInput(shot):
        return {"shot": shot}

    @staticmethod
    def buildStdShotsInput(shots):
        return {"shots": shots}
    
    @staticmethod
    def buildStdRunInput(run):
        return {"run": run}

    @staticmethod
    def buildExecutor(executorName, executorInput):
        return ExecutorRegistry[executorName](executorName, executorInput)

    @staticmethod
    def buildExecutorInput(*args):
        return [*args]
        