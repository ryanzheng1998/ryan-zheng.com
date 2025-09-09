import socket

# initialize variables
robotIP = "192.168.1.30"
PRIMARY_PORT = 30001
SECONDARY_PORT = 30002
REALTIME_PORT = 30003

# URScript command being sent to the robot
urscript_command = "movej([1.57, -1.57, 1.57, 1.57, 1.57, 0], a=1.4, v=1.05)"

# Creates new line
new_line = "\n"

def send_urscript_command(command: str):
    """
    This function takes the URScript command defined above, 
    connects to the robot server, and sends 
    the command to the specified port to be executed by the robot.

    Args:
        command (str): URScript command
        
    Returns: 
        None
    """
    try:
        # Create a socket connection with the robot IP and port number defined above
        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        s.connect((robotIP, PRIMARY_PORT))

        # Appends new line to the URScript command (the command will not execute without this)
        command = command+new_line
        
        # Send the command
        s.sendall(command.encode('utf-8'))
        
        # Close the connection
        s.close()

    except Exception as e:
        print(f"An error occurred: {e}")

send_urscript_command(urscript_command)