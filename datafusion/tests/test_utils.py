from app.utils.mdsplus_adapter import MDSplusAdapter
from app.utils.logbook_adapter import LogbookAdapter

if __name__ == '__main__':
    print(MDSplusAdapter.getNodeData('RFX', 39391, "\RFX::TOP.RFX.DIAG.A.RESULTS.EMRA:IT"))
    print(MDSplusAdapter.getNodeData('RFX', 39391, "\RFX::TOP.RFX.DIAG.A.RESULTS.EMRA:IT"))

    print(LogbookAdapter.getShotsOfRun(1))
