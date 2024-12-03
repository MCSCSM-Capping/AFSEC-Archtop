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


### Vulscan Command
The command to get data output is this `--script-args='vulscandb=cve.csv,vulscanoutput="ID: {id} - Title: {title} - Link: {link} ({matches})\n"' --script=vulscan/vulscan.nse -sV -p- ip -oX file_name.xml`. First we call nmap and give it the script-args that you want. These will alter the output of the scan results, and it used to make the output more readable and easier to add to the database. Next is the `--script=` this is where the user will tell nmap what scripts will be used. This argument can have multiple scipts, to do that you add a **,** in between the script. For example, `--script=vulscan/vulscan.nse,vulners`. Then the `-p` is how the user sepcfices which ports they want scanned added the `-` at the end makes all ports get scanned. The final bit is the -oX argument, this makes the ouptut a xml file. The command that we use is `--script-args='vulscandb=cve.csv,vulscanoutput="ID: {id} - Title: {title} - Link: {link} ({matches})\n"' --script=vulscan/vulscan.nse -sV -p- ip -oX file_namer.xml`.

### Special Case
**Special Case** : If you want to customize the output there are some options linked [here] (https://github.com/scipag/vulscan?tab=readme-ov-file#reporting). If you want to implement this the `--scirpts-args` will look like this `--script-args='vulscanoutput="ID: {id} - Title: {title} ({matches})\n"'`.

### Command Description
For the command shown in the second section there are specific arguments used. `--script-args='vulscandb=cve.csv,vulscanoutput="ID: {id} - Title: {title} - Link: {link} ({matches})\n"' --script=vulscan/vulscan.nse -sV -p- ip -oX file_name.xml`. The first part of this command is the `--script-args=` this is how the output will be specified for the database vulscan will search and the output of the data. `'vulscandb=cve.csv,vulscanoutput="ID: {id} - Title: {title} - Link: {link} ({matches})\n"'` the first part of this argument `vulscandb=cve.csv` specifies the vulscan database to use the cve.csv database to only show the csv's for the output. Then for `vulscanoutput` this argument can be changed as needed. For now it will output the id **this is the csv**, the title **this is the discription form the database**, and the link **this a link to where the info was pulled from**. Then is the script part, `--script=vulscan/vulscan.nse`,  this part just specifies that nmap needs to use the vulscan script for the scan. Finally the end of the command `-sV -p- ip -oX file_name.xml`. The **-sV** argument enable vulscan to do version detection. The **-p-** is to scan all ports. The **ip** this is not part of vulscan but where the user would add the ip. The **-oX** is a argument to export out the file as a xml. Finally **file_name.xml** this is also not part of vulscan and it where the file name would be for the output. We chose this command since it spaces the vulnerabilites out in nice chuncks, making it easier to read and easier to write to the database. You can see some example output in the file labeled `EX_OUPUT.txt`.


