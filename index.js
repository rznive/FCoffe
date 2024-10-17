  import "dotenv/config";
  import fetch from "node-fetch";
  import { v4 as uuidv4 } from "uuid";
  import promptSync from "prompt-sync";
  import fs from "fs";

  const prompt = promptSync();

  const getToken = async (deviceId) => {
    try {
      const response = await fetch("https://api.fore.coffee/auth/get-token", {
        method: "GET",
        headers: {
          Host: "api.fore.coffee",
          "Appsflyer-Id": "1712110677185-8189413",
          "Content-Type": "application/json",
          Accept: "*/*",
          "Appsflyer-Advertising-Id": "95B89FED-69A8-4D99-9751-48B54339738E",
          "App-Version": process.env.FORE_VERSION,
          "Device-Id": deviceId,
          "Accept-Encoding": "gzip, deflate, br",
          "Accept-Language": "id-ID;q=1.0, en-ID;q=0.9",
          Platform: "android",
          "User-Agent": "okhttp/4.11.0",
          "Os-Version": "13",
          "Secret-Key": "0kFe6Oc3R1eEa2CpO2FeFdzElp",
        },
      });

      return await response.json();
    } catch (error) {
      console.error("Error fetching token:", error);
      throw error;
    }
  };

  const checkPhoneNumber = async (phone, accessToken, deviceId) => {
    const url = "https://api.fore.coffee/auth/check-phone";
    const data = JSON.stringify({ phone });

    const config = {
      method: "POST",
      headers: {
        Host: "api.fore.coffee",
        "Appsflyer-Id": "1712110677185-8189413",
        "Content-Type": "application/json",
        "Country-Id": "1",
        Accept: "*/*",
        "Appsflyer-Advertising-Id": "95B89FED-69A8-4D99-9751-48B54339738E",
        "App-Version": process.env.FORE_VERSION,
        "Device-Id": deviceId,
        "Accept-Language": "id-ID;q=1.0, en-ID;q=0.9",
        "Accept-Encoding": "gzip, deflate, br",
        Platform: "android",
        Language: "ID",
        "Access-Token": accessToken,
        Timezone: "+07:00",
        "User-Agent": "okhttp/4.11.0",
        "Os-Version": "13",
      },
      body: data,
    };

    const response = await fetch(url, config);
    return await response.json();
  };

  const requestLoginCode = async (phone, accessToken, deviceId) => {
    const url = "https://api.fore.coffee/auth/req-login-code";
    const data = JSON.stringify({ phone });

    const config = {
      method: "POST",
      headers: {
        Host: "api.fore.coffee",
        "Appsflyer-Id": "1712110677185-8189413",
        "Content-Type": "application/json",
        "Country-Id": "1",
        Accept: "*/*",
        "Appsflyer-Advertising-Id": "95B89FED-69A8-4D99-9751-48B54339738E",
        "App-Version": process.env.FORE_VERSION,
        "Device-Id": deviceId,
        "Accept-Language": "id-ID;q=1.0, en-ID;q=0.9",
        "Accept-Encoding": "gzip, deflate, br",
        Platform: "android",
        Language: "ID",
        "Access-Token": accessToken,
        Timezone: "+07:00",
        "User-Agent": "okhttp/4.11.0",
        "Os-Version": "13",
      },
      body: data,
    };

    const response = await fetch(url, config);
    return await response.json();
  };

  // Function to sign up
  const signUp = async (phone, code, name, accessToken, deviceId) => {
    const url = "https://api.fore.coffee/auth/sign-up";
    const data = JSON.stringify({
      whatsapp: 0,
      phone,
      code,
      name,
      referral_code: "",
    });

    const config = {
      method: "POST",
      headers: {
        Host: "api.fore.coffee",
        "Appsflyer-Id": "1712110677185-8189413",
        "Content-Type": "application/json",
        "Country-Id": "1",
        Accept: "*/*",
        "Appsflyer-Advertising-Id": "95B89FED-69A8-4D99-9751-48B54339738E",
        "App-Version": process.env.FORE_VERSION,
        "Device-Id": deviceId,
        "Accept-Language": "id-ID;q=1.0, en-ID;q=0.9",
        "Accept-Encoding": "gzip, deflate, br",
        Platform: "android",
        Language: "ID",
        "Access-Token": accessToken,
        Timezone: "+07:00",
        "User-Agent": "okhttp/4.11.0",
        "Os-Version": "13",
      },
      body: data,
    };

    const response = await fetch(url, config);
    return await response.json();
  };

  // Function to set PIN
  const setPin = async (accessToken, deviceId, pin) => {
    const data = {
      confirm_pin: pin,
      pin: pin,
    };

    const config = {
      method: "POST",
      headers: {
        Host: "api.fore.coffee",
        "Appsflyer-Id": "1712110677185-8189413",
        "Content-Type": "application/json",
        "Country-Id": "1",
        Accept: "*/*",
        "Appsflyer-Advertising-Id": "95B89FED-69A8-4D99-9751-48B54339738E",
        "App-Version": process.env.FORE_VERSION,
        "Device-Id": deviceId,
        "Accept-Language": "id-ID;q=1.0, en-ID;q=0.9",
        "Accept-Encoding": "gzip, deflate, br",
        Platform: "android",
        Language: "ID",
        "Access-Token": accessToken,
        Timezone: "+07:00",
        "User-Agent": "okhttp/4.11.0",
        "Os-Version": "13",
      },
      body: JSON.stringify(data),
    };

    try {
      const response = await fetch("https://api.fore.coffee/auth/pin", config);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error setting PIN:", error);
      throw error;
    }
  };

  const checkVouchers = async (deviceId, accessToken) => {
      const send = await fetch(
        "https://api.fore.coffee/user/voucher?page=1&perpage=50&disc_type=cat_promo&vc_disc_type=order",
        {
          headers: {
            Host: "api.fore.coffee",
            "Appsflyer-Id": "1712110677185-8189413",
            "Content-Type": "application/json",
            "Country-Id": "1",
            Accept: "*/*",
            "Appsflyer-Advertising-Id": "95B89FED-69A8-4D99-9751-48B54339738E",
            "App-Version": process.env.FORE_VERSION,
            "Device-Id": deviceId,
            "Accept-Language": "id-ID;q=1.0, en-ID;q=0.9",
            "Accept-Encoding": "gzip, deflate, br",
            Platform: "android",
            Language: "ID",
            "Access-Token": accessToken,
            Timezone: "+07:00",
            "User-Agent": "okhttp/4.11.0",
            "Os-Version": "13",
          },
        }
      );
      const response = await send.json();
    
      // Filter vouchers to only include the desired one
      const filteredVouchers = response.payload.data.filter(voucher => 
        voucher.prm_name === "New User - Disc. 50% up to IDR 35K"
      );
    
      return filteredVouchers;
    };

  // Function to read account details from file
  const readAccountDetails = () => {
    const data = fs.readFileSync("resultACC.txt", "utf-8");
    const lines = data.split("\n").filter(Boolean);

    let deviceId, accessToken;

    lines.forEach((line) => {
      if (line.startsWith("UUID:")) {
        deviceId = line.split(": ")[1];
      } else if (line.startsWith("Access Token:")) {
        accessToken = line.split(": ")[1];
      }
    });

    return { deviceId, accessToken };
  };

  const getTokoclaudeProfile = async () => {
    const url = "https://tokoclaude.com/api/get-profile/ganti-apikey-tokoclaude-anda-disini"; //ganti dengan tokoclaude apinya disiini
    
    try {
      const response = await fetch(url);
      const profileData = await response.json();
      return profileData;
    } catch (error) {
      console.error("Error fetching TokoClaude profile:", error);
      throw error;
    }
  };
  const getOrderDetails = async () => {
      const url = "https://tokoclaude.com/api/set-orders/ganti-apikey-tokoclaude-anda-disini/346";
      
      try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.success) {
          return data.data.data; // returns { order_id, number }
        } else {
          throw new Error("Failed to set order.");
        }
      } catch (error) {
        console.error("Error fetching order details:", error);
        throw error;
      }
    };
    
  // Function to get OTP using order_id
  const getOtp = async (orderId) => {
      const url = `https://tokoclaude.com/api/get-orders/ganti-apikey-tokoclaude-anda-disini/${orderId}`;
      
      try {
          const response = await fetch(url);
          const data = await response.json();
          
          // Log the entire response for debugging
          console.log("OTP fetch response:");
          
          if (data.success) {
              if (data.data.data && data.data.data.length > 0) {
                  const orderInfo = data.data.data[0];
                  
                  if (orderInfo.sms) {
                      // If sms is not null, parse the SMS string
                      const smsArray = JSON.parse(orderInfo.sms); 
                      const otpMessage = smsArray[0].sms;
                      const code = otpMessage.match(/\d{5}/g);
                      return code ? code.join("") : null; 
                  } else {
                      throw new Error("No SMS message received.");
                  }
              } else {
                  throw new Error("No order data found.");
              }
          } else {
              throw new Error("Failed to get order details.");
          }
      } catch (error) {
          console.error("Error fetching OTP:");
          throw error;
      }
  };
    
    // Function to continuously check for OTP without retries
  const checkOtpUntilReceived = async (orderId) => {
      while (true) {
        try {
          const otpMessage = await getOtp(orderId);
          if (otpMessage) {
            return otpMessage; // Return the OTP if found
          }
          console.log("OTP not yet received, checking again in 5 seconds...");
        } catch (error) {
          console.error("Error fetching OTP:", error.message);
        }
        // Wait for 5 seconds before the next attempt
        await new Promise((resolve) => setTimeout(resolve, 5000));
      }
    };
    
// Function to pad strings to a fixed length for column formatting
const pad = (str, length) => {
  return String(str || '').padEnd(length, ' ');  // Convert to string
};

// Function to display account details in a table format
const displayAccountDetails = () => {
  try {
    const data = fs.readFileSync('resultACC.txt', 'utf-8');
    const lines = data.split("\n").filter(Boolean); // Remove any empty lines

    let accountDetails = [];
    let currentAccount = {};

    lines.forEach(line => {
      if (line.startsWith('Name:')) {
        currentAccount.name = line.split(': ')[1];
      } else if (line.startsWith('Phone:')) {
        currentAccount.phone = line.split(': ')[1];
      } else if (line.startsWith('PIN:')) {
        currentAccount.pin = line.split(': ')[1];
      } else if (line.startsWith('UUID:')) {
        currentAccount.uuid = line.split(': ')[1];
        // After getting all details of one account, add it to the accountDetails array
        accountDetails.push(currentAccount);
        currentAccount = {}; // Reset for the next account
      }
    });

    // Display the table header with padding
    console.log(`${pad('No.', 5)}${pad('Name', 20)}${pad('Phone', 15)}${pad('PIN', 8)}${pad('UUID', 40)}`);
    console.log("-".repeat(81));

    // Display each account's details with padding and numbering
    accountDetails.forEach((account, index) => {
      console.log(`${pad(index + 1, 5)}${pad(account.name, 20)}${pad(account.phone, 15)}${pad(account.pin, 8)}${pad(account.uuid, 40)}`);
    });

  } catch (error) {
    console.error("Error reading or processing file:", error);
  }
};

  // Main menu
  const mainMenu = async () => {
    console.log("1. Create account manual");
    console.log("2. Create account with TokoClaude [Otomatis]");
    console.log("3. Check Voucher account");
    console.log("4. Display list account");
    const choice = prompt("Please select an option: ");

    if (choice === "1") {
      const deviceId = uuidv4();
      console.log("Generated UUID:", deviceId);
      const tokenResponse = await getToken(deviceId);
      console.log("Token received:", tokenResponse);
      const accessToken = tokenResponse.payload.access_token;

      const phone = prompt("Please enter your phone number: ");

      try {
        const phoneCheckResult = await checkPhoneNumber(
          phone,
          accessToken,
          deviceId
        );
        console.log("Phone check result:", phoneCheckResult);

        if (phoneCheckResult.payload.is_registered === 0) {
          console.log("Phone is not registered. Requesting login code...");
          const loginCodeResponse = await requestLoginCode(
            phone,
            accessToken,
            deviceId
          );
          console.log("Login code response:", loginCodeResponse);

          const code = prompt("Please enter the OTP sent to your phone: ");
          const name = prompt(
            'Enter your name: '
          );

          try {
            const signUpResponse = await signUp(
              phone,
              code,
              name,
              accessToken,
              deviceId
            );
            if (
              signUpResponse.status === "success" &&
              signUpResponse.payload.code === "success"
            ) {
              console.log("== Pendaftaran Berhasil ==");
              const pin = prompt("Please enter your desired PIN: ");
              const pinResponse = await setPin(accessToken, deviceId, pin);
              console.log("PIN set response:", pinResponse);

              const accountDetails = `Name: ${name}\nPhone: ${phone}\nAccess Token: ${accessToken}\nUUID: ${deviceId}\nPIN: ${pin}\n\n`;
              fs.writeFileSync("resultACC.txt", accountDetails, { flag: "a" }); // 'a' for append mode
            } else {
              console.error("Signup failed:", signUpResponse);
            }
          } catch (error) {
            console.error("Error during signup:", error);
          }
        } else {
          console.log("Phone is already registered.");
        }
      } catch (error) {
        console.error("Error checking phone number:", error);
      }
    } else if (choice === "3") {
      const { deviceId, accessToken } = readAccountDetails();

      if (!deviceId || !accessToken) {
        console.error("Failed to retrieve device ID or access token.");
        return;
      }

      try {
        const voucherResponse = await checkVouchers(deviceId, accessToken);
        console.log(
          "Voucher check result:",
          JSON.stringify(voucherResponse, null, 2)
        );

        const vouchers = voucherResponse.payload.data;
        console.log("Vouchers:");
        vouchers.forEach((voucher, index) => {
          console.log(`Voucher ${index + 1}:`, JSON.stringify(voucher, null, 2));
        });
      } catch (error) {
        console.error("Error checking vouchers:", error);
      }
    } else if (choice === "2") {
      const deviceId = uuidv4();
      console.log("Generated UUID:", deviceId);
      const tokenResponse = await getToken(deviceId);
      console.log("Token received:", tokenResponse);
      const accessToken = tokenResponse.payload.access_token;

      try {
        // Fetch order details to get phone number
        const orderDetails = await getOrderDetails(); // Fetch the order details
        console.log("Order details response:", orderDetails); // Log the entire response

        if (orderDetails && orderDetails.number) {
          const number = orderDetails.number; // Directly access the number
          const order_id = orderDetails.order_id; // Access the order_id
          console.log("Fetched phone number:", number);

          // Check if the phone number is registered
          const phoneCheckResult = await checkPhoneNumber(number, accessToken, deviceId);
          console.log("Phone check result:", phoneCheckResult);

          if (phoneCheckResult.payload.is_registered === 0) {
            console.log("Phone is not registered. Requesting login code...");
            const loginCodeResponse = await requestLoginCode(number, accessToken, deviceId);
            console.log("Login code response:", loginCodeResponse);

            const code = await checkOtpUntilReceived(order_id); // Use the order_id to get the OTP
            const otp = code.match(/\d{5}/g).join("");
            console.log("Fetched OTP:", otp);

            const name = prompt('Enter your name: ');

            // Sign up process
            try {
              const signUpResponse = await signUp(
                number,
                otp,
                name,
                accessToken,
                deviceId
              );
              if (
                signUpResponse.status === "success" &&
                signUpResponse.payload.code === "success"
              ) {
                console.log("== Pendaftaran Berhasil ==");

                const pin = prompt("Please enter your desired PIN: ");
                const pinResponse = await setPin(accessToken, deviceId, pin);
                console.log("PIN set response:", pinResponse);

                const accountDetails = `Name: ${name}\nPhone: ${number}\nAccess Token: ${accessToken}\nUUID: ${deviceId}\nPIN: ${pin}\n\n`;
                fs.writeFileSync("resultACC.txt", accountDetails, { flag: "a" });
              } else {
                console.error("Signup failed:", signUpResponse);
              }
            } catch (error) {
              console.error("Error during signup:", error);
            }
          } else {
            console.log("Phone is already registered.");
          }
        } else {
          console.error("No order details found or invalid structure.");
        }
      } catch (error) {
        console.error("Error checking phone number:", error);
      }
    }else if (choice === "4") {
      displayAccountDetails();
    } else {
      console.log("Invalid choice. Please select 1, 2, or 3.");
    }
  };
  

  mainMenu().catch((error) => {
    console.error("Error:", error);
  });