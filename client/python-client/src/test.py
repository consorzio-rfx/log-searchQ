import MDSplus as mds
import matplotlib.pyplot as plt
import time

start_time = time.time()

shot1 = mds.Tree('RFX', 39391)
shot2 = mds.Tree('RFX', 39390)

end_time1 = time.time()
execution_time = end_time1 - start_time
print(f"Execution Time: {execution_time} seconds")

node1 = shot1.getNode('\RFX::TOP.RFX.DIAG.A.RESULTS.EMRA:IT')
node2 = shot2.getNode('\RFX::TOP.RFX.DIAG.A.RESULTS.EMRA:IT')

tmp = shot1.getNode('\RFX::TOP.RFX:PARAMETERS')
print(tmp.getData().data())


# nodes = shot1.getNodeWild('***')
# for node in nodes:
#     print(node.fullpath)

# plt.subplot(2, 1, 1)
# plt.plot(node1.dim_of().data(),node1.data())

# plt.subplot(2, 1, 2)
# plt.plot(node2.dim_of().data(),node2.data())

# plt.show()