import React from "react";
import ZoomMtgEmbedded from "@zoomus/websdk/embedded";

export function StartVideo({ role, userName, buttonText }) {
  const client = ZoomMtgEmbedded.createClient();

  // setup your signature endpoint here: https://github.com/zoom/meetingsdk-sample-signature-node.js
  var signatureEndpoint =
    "https://zoom-meeting-sdk-signature-tes.herokuapp.com/";
  //   var signatureEndpoint = "http://localhost:4000";

  // This Sample App has been updated to use SDK App type credentials https://marketplace.zoom.us/docs/guides/build/sdk-app
  var sdkKey = "MwyTqmrLDuWwUSf22XuJ52VTPYNsS2pSt4G1";
  var meetingNumber = "3151847483";
  var role = { role };
  var userName = { userName };
  var userEmail = "novialim@gmail.com";
  var passWord = "wH5_eTlc3yUtQCMtui3OSL88fnLapr.1";
  // pass in the registrant's token if your meeting or webinar requires registration. More info here:
  // Meetings: https://marketplace.zoom.us/docs/sdk/native-sdks/web/component-view/meetings#join-registered
  // Webinars: https://marketplace.zoom.us/docs/sdk/native-sdks/web/component-view/webinars#join-registered
  var registrantToken = "";

  function getSignature(e) {
    e.preventDefault();

    fetch(signatureEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        meetingNumber: meetingNumber,
        role: role,
      }),
    })
      .then((res) => res.json())
      .then((response) => {
        startMeeting(response.signature);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function startMeeting(signature) {
    let meetingSDKElement = document.getElementById("meetingSDKElement");

    client.init({
      debug: true,
      zoomAppRoot: meetingSDKElement,
      language: "en-US",
      customize: {
        meetingInfo: [
          "topic",
          "host",
          "mn",
          "pwd",
          "telPwd",
          "invite",
          "participant",
          "dc",
          "enctype",
        ],
        toolbar: {
          buttons: [
            {
              text: "Custom Button",
              className: "CustomButton",
              onClick: () => {
                console.log("custom button");
              },
            },
          ],
        },
      },
    });

    client.join({
      sdkKey: sdkKey,
      signature: signature,
      meetingNumber: meetingNumber,
      password: passWord,
      userName: userName,
      userEmail: userEmail,
      tk: registrantToken,
    });
  }

  return (
    <div>
      <main>
        {/* For Component View */}
        <div id="meetingSDKElement">
          {/* Zoom Meeting SDK Component View Rendered Here */}
        </div>
        <button onClick={getSignature}>{buttonText}</button>
      </main>
    </div>
  );
}
