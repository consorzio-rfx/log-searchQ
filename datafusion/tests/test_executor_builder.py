from app.utils.executor_builder import ExecutorBuilder
from app import create_app


if __name__ == '__main__':
    app = create_app()
    with app.app_context(): 
        executor1 = ExecutorBuilder.buildExecutor("ComputeMaxCurrentOfShotExecutor", 
                                              ExecutorBuilder.buildExecutorInput(ExecutorBuilder.buildStdShotInput(1), 
                                                                                 ExecutorBuilder.buildStdPathInput("MDSplus:RFX::TOP.RFX.DIAG.A.RESULTS.EMRA:IT")))
        # print(executor1.execute())

        executor2 = ExecutorBuilder.buildExecutor("ComputeMaxCurrentOfShotsExecutor",
                                                  ExecutorBuilder.buildExecutorInput(ExecutorBuilder.buildStdShotsInput([1,2,3]),
                                                                                     ExecutorBuilder.buildStdPathInput("MDSplus:RFX::TOP.RFX.DIAG.A.RESULTS.EMRA:IT")))
        # print(executor2.execute())

        executor3 = ExecutorBuilder.buildExecutor("ComputeMaxCurrentOfShotsExecutor",
                                                  ExecutorBuilder.buildExecutorInput(ExecutorBuilder.buildExecutor("GetShotsOfRunExecutor", ExecutorBuilder.buildExecutorInput(ExecutorBuilder.buildStdRunInput(1))).to_json(),
                                                                                     ExecutorBuilder.buildStdPathInput("MDSplus:RFX::TOP.RFX.DIAG.A.RESULTS.EMRA:IT")))
        print(executor3.execute())