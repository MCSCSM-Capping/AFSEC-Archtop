### Command information

1. Vulscan is a script that is added to the nmap scripts folder. Vulscan will use many different databases and websites in order to find all vulnerabilites scanned on the open port on the ip address.

    1. `VulDB - https://vuldb.com`
    2. `MITRE CVE - https://cve.mitre.org`
    3. `SecurityFocus - https://www.securityfocus.com/bid/`
    4. `IBM X-Force - https://exchange.xforce.ibmcloud.com`
    5. `Exploit-DB - https://www.exploit-db.com`
    6. `OpenVAS (Nessus) - http://www.openvas.org`
    7. `SecurityTracker - https://www.securitytracker.com`
    8. `OSVDB - http://www.osvdb.org`

2. The command to get data output is this `sudo nmap  --script-args vulscanoutput=(arguments) --script=vulscan/vulscan.nse -sV -p- ip-address >> txt_file`. First we call nmap adn give it the script-args that you want. These will alter the output of the scan results, and it used to make the output more readable and easier to add to the database. Next is the `--script=` this is where the user will tell nmap what scripts will be used. This argument can have multiple scipts, to do that you add a **,** in between the script. For example, `--script=vulscan/vulscan.nse,vulners`. Then the `-p` is how the user sepcfices which ports they want scanned added the `-` at the end makes all ports get scanned. The command that we use is `sudo nmap  --script-args vulscanoutput=details --script=vulscan/vulscan.nse -sV -p- ip-address >> txt_file`.

    **Special Case** : If you want to customize the output there are some options linked [here] (https://github.com/scipag/vulscan?tab=readme-ov-file#reporting). If you want to implement this the `--scirpts-args` will look like this `--script-args='vulscanoutput="ID: {id} - Title: {title} ({matches})\n"'`.

3. We chose this command since it spaces the vulnerabilites out in nice chuncks, making it easier to read and easier to write to the database. You can see some example output in the file labeled `EX_OUPUT.txt`.