#!/usr/bin/env python3
import time

from rtde import rtde, rtde_config

ROBOT_HOST = "192.168.1.30"  # ← change to your robot IP
ROBOT_PORT = 30004
CONFIG_FILE = "record_configuration.xml"  # must include <recipe key="out">

# load config
conf = rtde_config.ConfigFile(CONFIG_FILE)
names, types = conf.get_recipe("out")

# connect
con = rtde.RTDE(ROBOT_HOST, ROBOT_PORT)
con.connect()
con.get_controller_version()
con.send_output_setup(names, types, frequency=125)
con.send_start()

# simple loop
while True:
    state = con.receive()
    if state:
        if hasattr(state, "actual_q"):
            print("Joint pos:", state.actual_q)
        if hasattr(state, "actual_TCP_pose"):
            print("TCP pose:", state.actual_TCP_pose)
    time.sleep(0.1)
