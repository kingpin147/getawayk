import { Permissions, webMethod } from "wix-web-module";
import wixData from 'wix-data';

export const addTP = webMethod(
    Permissions.Anyone,
    (data) => {
        const toInsert = {
            title_fld: data.businessName,
            image_fld: data.profileImage,
            email: data.email,
            memberReference: data.id
        }
        wixData.save("TravelProfessionals", toInsert)
        .then(()=>{
          console.log("data saved for Travel Professionals")
        })
    }
);

export const checkPlan = webMethod(
    Permissions.Anyone,
    (memberId, plan) => {
      const results = wixData.query()
    })