async function takeStringFromFile(path) {
  const response = await fetch(path);

  if (!response.ok) {
    throw new Error(`Failed to load ${path}: ${response.status}`);
  }

  return (await response.text()).trim();
}
let encryptedProfileBase64String;
let encryptedUniversityLogoBase64String;

let encryptedExternal1Base64String;

let encryptedCertiportJavaBase64String;
let encryptedCertiportCyberSecurityBase64String;
let encryptedCertiportHTMLCSSBase64String;
let encryptedCertiportDatabasesBase64String;
let encryptedCertiportNetworkSecurityBase64String;

let encryptedUniversityCertificate1Base64String;
let encryptedUniversityCertificate2Base64String;
let encryptedUniversityCertificate3Base64String;
let encryptedUniversityCertificate4Base64String;
let encryptedUniversityCertificate5Base64String;

let encryptedCertificateOfCompletionBase64String;

let encryptedHTEBase64String;

let encryptedTextDegreeBase64String;
let encryptedTextCollegeDepartmentBase64String;
let encryptedTextUniversityBase64String;
let encryptedTextExternal1Base64String;
let encryptedTextUniversityRecognition1Base64String;
let encryptedTextUniversityRecognition4Base64String;
let encryptedTextMentorBase64String;
let encryptedTextHTEBase64String;
let encryptedTextExperienceBase64String;

async function fetchTextBase64Strings() {
  encryptedTextDegreeBase64String = await takeStringFromFile("assets/texts/degree.txt");
  encryptedTextCollegeDepartmentBase64String = await takeStringFromFile("assets/texts/college-department.txt");
  encryptedTextUniversityBase64String = await takeStringFromFile("assets/texts/university.txt");
  encryptedTextExternal1Base64String = await takeStringFromFile("assets/texts/external-recognition-1.txt");
  encryptedTextUniversityRecognition1Base64String = await takeStringFromFile(
    "assets/texts/university-recognition-1.txt",
  );
  encryptedTextUniversityRecognition4Base64String = await takeStringFromFile(
    "assets/texts/university-recognition-4.txt",
  );
  encryptedTextMentorBase64String = await takeStringFromFile("assets/texts/mentor.txt");

  encryptedTextHTEBase64String = await takeStringFromFile("assets/texts/hte.txt");
  encryptedTextExperienceBase64String = await takeStringFromFile("assets/texts/experience.txt");
}

async function decryptTexts() {
  const decryptedTextDegree = await decrypt(encryptedTextDegreeBase64String);
  const decryptedTextCollegeDepartment = await decrypt(encryptedTextCollegeDepartmentBase64String);
  const decryptedTextUniversity = await decrypt(encryptedTextUniversityBase64String);
  const decryptedTextExternal1 = await decrypt(encryptedTextExternal1Base64String);
  const decryptedTextUniversityRecognition1 = await decrypt(encryptedTextUniversityRecognition1Base64String);
  const decryptedTextUniversityRecognition4 = await decrypt(encryptedTextUniversityRecognition4Base64String);
  const decryptedTextMentor = await decrypt(encryptedTextMentorBase64String);
  const decryptedTextHTE = await decrypt(encryptedTextHTEBase64String);
  const decryptedTextExperience = await decrypt(encryptedTextExperienceBase64String);
  document.getElementById("encryptedTextDegreeEducationalBackground").textContent = decryptedTextDegree;

  document.getElementById("encryptedTextCollegeDepartmentEducationalBackground").textContent =
    decryptedTextCollegeDepartment;

  document.getElementById("encryptedTextUniversityEducationalBackground").textContent = decryptedTextUniversity;

  document.getElementById("encryptedTextExternal1").textContent = decryptedTextExternal1;

  document.getElementById("encryptedTextUniversityRecognition1").textContent = decryptedTextUniversityRecognition1;

  document.getElementById("encryptedTextUniversityRecognition4").textContent = decryptedTextUniversityRecognition4;

  document.getElementById("encryptedTextMentor").textContent = decryptedTextMentor;
  document.getElementById("encryptedTextHTE").textContent = decryptedTextHTE;
  document.getElementById("encryptedTextExperience").textContent = decryptedTextExperience;
}

async function fetchImageBase64Strings() {
  encryptedProfileBase64String = await takeStringFromFile("assets/images/pictures/profile.txt");
  encryptedUniversityLogoBase64String = await takeStringFromFile("assets/images/pictures/university-logo.txt");
  encryptedExternal1Base64String = await takeStringFromFile("assets/images/certificates/external-1.txt");
  encryptedCertificateOfCompletionBase64String = await takeStringFromFile(
    "assets/images/certificates/certificate-of-completion.txt",
  );

  encryptedHTEBase64String = await takeStringFromFile("assets/images/pictures/hte.txt");

  encryptedCertiportCyberSecurityBase64String = await takeStringFromFile(
    "assets/images/certificates/certiport-cybersecurity.txt",
  );
  encryptedCertiportJavaBase64String = await takeStringFromFile("assets/images/certificates/certiport-java.txt");
  encryptedCertiportHTMLCSSBase64String = await takeStringFromFile("assets/images/certificates/certiport-html-css.txt");
  encryptedCertiportDatabasesBase64String = await takeStringFromFile(
    "assets/images/certificates/certiport-databases.txt",
  );
  encryptedCertiportNetworkSecurityBase64String = await takeStringFromFile(
    "assets/images/certificates/certiport-network-security.txt",
  );

  encryptedUniversityCertificate1Base64String = await takeStringFromFile(
    "assets/images/certificates/university-certificate-1.txt",
  );
  encryptedUniversityCertificate2Base64String = await takeStringFromFile(
    "assets/images/certificates/university-certificate-2.txt",
  );
  encryptedUniversityCertificate3Base64String = await takeStringFromFile(
    "assets/images/certificates/university-certificate-3.txt",
  );
  encryptedUniversityCertificate4Base64String = await takeStringFromFile(
    "assets/images/certificates/university-certificate-4.txt",
  );
  encryptedUniversityCertificate5Base64String = await takeStringFromFile(
    "assets/images/certificates/university-certificate-5.txt",
  );

  // console.log("Base64:", encryptedProfileBase64String);

  // const encrypted = await encrypt(encryptedProfileBase64String);

  // console.log("Encrypted package:", encrypted);
}

// Input handling function
async function handleKeySubmission() {
  const userKey = document.getElementById("decryption-key-input").value.trim();

  if (!userKey) {
    alert("Please enter a key.");
    return;
  }

  try {
    hexKeyString = userKey;
    await fetchTextBase64Strings();

    await fetchImageBase64Strings();

    alert("Success! Content unlocked.");
    await decryptTexts();

    const dencryptedProfileBase64String = await decrypt(encryptedProfileBase64String);
    const dencryptedUniversityLogoBase64String = await decrypt(encryptedUniversityLogoBase64String);
    const dencryptedExternal1Base64String = await decrypt(encryptedExternal1Base64String);

    const dencryptedCertiportCyberSecurityBase64String = await decrypt(encryptedCertiportCyberSecurityBase64String);
    const dencryptedCertiportJavaBase64String = await decrypt(encryptedCertiportJavaBase64String);
    const dencryptedCertiportHTMLCSSBase64String = await decrypt(encryptedCertiportHTMLCSSBase64String);
    const dencryptedCertiportDatabasesBase64String = await decrypt(encryptedCertiportDatabasesBase64String);
    const dencryptedCertiportNetworkSecurityBase64String = await decrypt(encryptedCertiportNetworkSecurityBase64String);

    const dencryptedUniversityCertificate1Base64String = await decrypt(encryptedUniversityCertificate1Base64String);
    const dencryptedUniversityCertificate2Base64String = await decrypt(encryptedUniversityCertificate2Base64String);
    const dencryptedUniversityCertificate3Base64String = await decrypt(encryptedUniversityCertificate3Base64String);
    const dencryptedUniversityCertificate4Base64String = await decrypt(encryptedUniversityCertificate4Base64String);
    const dencryptedUniversityCertificate5Base64String = await decrypt(encryptedUniversityCertificate5Base64String);

    const dencryptedCertificateOfCompletionBase64String = await decrypt(encryptedCertificateOfCompletionBase64String);
    const dencryptedHTEBase64String = await decrypt(encryptedHTEBase64String);

    document.getElementById("encryptedProfilePicture").src = `data:image/jpeg;base64,${dencryptedProfileBase64String}`;
    document.getElementById("encryptedUniversityLogo").src =
      `data:image/jpeg;base64,${dencryptedUniversityLogoBase64String}`;
    document.getElementById("encryptedExternal1").src = `data:image/jpeg;base64,${dencryptedExternal1Base64String}`;

    document.getElementById("encryptedCertiportCyberSecurity").src =
      `data:image/jpeg;base64,${dencryptedCertiportCyberSecurityBase64String}`;
    document.getElementById("encryptedCertiportJava").src =
      `data:image/jpeg;base64,${dencryptedCertiportJavaBase64String}`;
    document.getElementById("encryptedCertiportHTMLCSS").src =
      `data:image/jpeg;base64,${dencryptedCertiportHTMLCSSBase64String}`;
    document.getElementById("encryptedCertiportDatabases").src =
      `data:image/jpeg;base64,${dencryptedCertiportDatabasesBase64String}`;
    document.getElementById("encryptedCertiportNetworkSecurity").src =
      `data:image/jpeg;base64,${dencryptedCertiportNetworkSecurityBase64String}`;

    document.getElementById("encryptedUniversityCertificate1").src =
      `data:image/jpeg;base64,${dencryptedUniversityCertificate1Base64String}`;
    document.getElementById("encryptedUniversityCertificate2").src =
      `data:image/jpeg;base64,${dencryptedUniversityCertificate2Base64String}`;
    document.getElementById("encryptedUniversityCertificate3").src =
      `data:image/jpeg;base64,${dencryptedUniversityCertificate3Base64String}`;
    document.getElementById("encryptedUniversityCertificate4").src =
      `data:image/jpeg;base64,${dencryptedUniversityCertificate4Base64String}`;
    document.getElementById("encryptedUniversityCertificate5").src =
      `data:image/jpeg;base64,${dencryptedUniversityCertificate5Base64String}`;

    document.getElementById("encryptedCertificateOfCompletion").src =
      `data:image/jpeg;base64,${dencryptedCertificateOfCompletionBase64String}`;

    document.getElementById("encryptedHTE").src = `data:image/jpeg;base64,${dencryptedHTEBase64String}`;

    // Hide the "Initialize Image"
    const placeholder = document.getElementById("initialize-image-placeholder");

    // Animate down to zero
    placeholder.style.opacity = "0";
    placeholder.style.height = "0";
    placeholder.style.paddingTop = "0";
    placeholder.style.paddingBottom = "0";
    placeholder.style.marginTop = "0";
    placeholder.style.marginBottom = "0";
    ScrollTrigger.refresh();

    // Fully hide after the 0.5s animation finishes
    setTimeout(() => {
      placeholder.style.display = "none";
      ScrollTrigger.refresh(); // refresh ScrollTrigger after hiding the button to keep scroll positions accurate
    }, 500);
  } catch (error) {
    console.error("Decryption failed:", error);
    alert("Invalid Key or Corrupted Data!");
  }
}

// Function to bind event listeners to dynamically loaded elements
function initializeAssetDecryption() {
  const decryptBtn = document.getElementById("decrypt-assets-btn");

  if (decryptBtn) {
    decryptBtn.addEventListener("click", handleKeySubmission);
  } else {
    console.warn("decrypt-assets-btn element not found in DOM.");
  }
}
