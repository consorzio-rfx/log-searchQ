import time
import numpy as np

class MDSplusAdapter:
    @staticmethod
    def getNodeData(treeName, shotNum, nodePath):
        '''
        tree = mds.Tree(treeName, shotNum)
        node = tree.getNode(nodePath)
        data = node.getData().data()
        ''' 

        # Mock
        time.sleep(3)
        np.random.seed(0)
        return np.random.rand(10)
