import { addTP } from "backend/guides.web";
import { authentication } from "wix-members-frontend";
import wixUsers from "wix-users";

let businessName = "",
  selectedItem = null,
  selectedItemInfo = {},
  profileImage = "";

$w.onReady(function () {
  // Initialize Progress Bar
  $w("#progressBar").targetValue = 5;
  $w("#progressBar").value = 1;

  // Step 1 -> Step 2
  $w("#nextBtn1").onClick(() => {
    $w("#statebox8").changeState("Step2");
    $w("#progressBar").value = 2;
  });

  // Step 2 -> Step 3
  $w("#nextBtn2").onClick(() => {
    $w("#statebox8").changeState("Step3");
    $w("#progressBar").value = 3;
  });

  // Step 3 -> Step 4
  $w("#nextBtn3").onClick(() => {
    $w("#statebox8").changeState("Step4");
    $w("#progressBar").value = 4;
  });

  // Step 4 -> Step 5
  $w("#nextBtn4").onClick(() => {
    $w("#statebox8").changeState("Step5");
    $w("#progressBar").value = 5;
    saveData();
  });

  // Step 2 Logic: Capture Business Name
  $w("#input1").onInput((event) => {
    if ($w("#input1").valid) {
      businessName = event.target.value; // Corrected from .name
      $w("#businessName, #businessName2").text = businessName;
      $w("#nextBtn2").enable();
    } else {
      businessName = "";
      $w("#nextBtn2").disable();
    }
  });

  // Step 3 Logic: Handle Profile Picture Upload
  $w("#uploadButton1").onChange(() => {
    if ($w("#uploadButton1").value.length > 0) {
      $w("#uploadButton1")
        .uploadFiles()
        .then((files) => {
          const file = files[0].fileUrl;
          profileImage = file;
          $w("#image").src = profileImage;
          $w("#profilePic").src = profileImage;
          $w("#image, #image95").show();
          $w("#nextBtn3").enable();
        })
        .catch((error) => {
          profileImage = "";
          $w("#nextBtn3").disable();
          $w("#image, #image95").hide();
          console.error("Upload error: ", error);
        });
    }
  });

  // Step 1 Logic: Guides Selector
  $w("#guidesList").onItemReady(($item, itemData, position) => {
    $item("#guide").onClick(() => {
      if (selectedItem === position) {
        // Deselect
        selectedItem = null;
        $item("#selected").hide();
        $w("#nextBtn1").disable();
      } else {
        // Select
        selectedItem = position;
        selectedItemInfo.guideImage = itemData.image_fld;
        $w("#guideImageMain").src = selectedItemInfo.guideImage;
        selectedItemInfo.shortDescription = itemData.shortDescription;
        $w("#description").text = selectedItemInfo.shortDescription;
        selectedItemInfo.longDescription = itemData.longDescription;

        // Hide selection indicator on all, then show on clicked
        $w("#selected").hide();
        $item("#selected").show();

        // Enable the Next button
        $w("#nextBtn1").enable();
      }
    });
  });
});

async function saveData() {
  try {
    const email = await wixUsers.currentUser.getEmail();
    const id = wixUsers.currentUser.id;
    const data = {
      businessName,
      profileImage,
      email,
      id,
    };
    await addTP(data);
    console.log("Data saved successfully");
  } catch (error) {
    console.error("Error saving data: ", error);
  }
}
