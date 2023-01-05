import React, { Component, useEffect } from "react";
import { useHistory } from "react-router-dom";

function Chatbot() {
  const history = useHistory();
  useEffect(() => {
    (function (d, m) {
      var kommunicateSettings = {
        appId: "236181eb4fea4e6752958c702ceb8fd50",
        popupWidget: true,
        automaticChatOpenOnNavigation: true,

        onInit: function () {
          var events = {
            onMessageReceived: function (resp) {
              console.log(resp);
            },
            onMessageSent: function (resp) {
              console.log(resp);
              //called when the message is sent
            //²  history.push("/upload-prescription");
            },
          };
          Kommunicate.subscribeToEvents(events);
        },
      };

      var s = document.createElement("script");
      s.type = "text/javascript";
      s.async = true;
      s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
      var h = document.getElementsByTagName("head")[0];
      h.appendChild(s);
      window.kommunicate = m;
      m._globals = kommunicateSettings;
    })(document, window.kommunicate || {});
  }, []);
  return <div></div>;
}

export default Chatbot;
