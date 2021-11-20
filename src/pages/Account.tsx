import React, { useState } from "react";
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonPage,
  IonButtons,
  IonMenuButton,
  IonList,
  IonItem,
  IonAlert,
  IonIcon,
  IonLabel,
  IonCard,
  IonItemGroup,
  IonImg,
  IonCardTitle,
} from "@ionic/react";
import "./Account.scss";
import { setUsername } from "../data/user/user.actions";
import { connect } from "../data/connect";
import { RouteComponentProps } from "react-router";
import { trophyOutline } from "ionicons/icons";

interface OwnProps extends RouteComponentProps {}

interface StateProps {
  username?: string;
}

interface DispatchProps {
  setUsername: typeof setUsername;
}

interface AccountProps extends OwnProps, StateProps, DispatchProps {}

const Account: React.FC<AccountProps> = ({ setUsername, username }) => {
  const [showAlert, setShowAlert] = useState(false);

  const clicked = (text: string) => {
    console.log(`Clicked ${text}`);
  };

  return (
    <IonPage id="account-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>Account</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {username && (
          <div className="ion-padding-top ion-text-center">
            <img
              src="https://media-exp1.licdn.com/dms/image/C5603AQHaQyDbdMlh1g/profile-displayphoto-shrink_400_400/0/1600666937503?e=1642636800&v=beta&t=pErhc2cvEijWW2kLw5KrsI08UUnpbgSyHshgQplaYIQ"
              alt="avatar"
            />
            <h2>{username}</h2>
            <IonList inset>
              <IonItem onClick={() => clicked("Update Picture")}>
                Update Picture
              </IonItem>
              <IonItem onClick={() => setShowAlert(true)}>
                Change Username
              </IonItem>
              <IonItem onClick={() => clicked("Change Password")}>
                Change Password
              </IonItem>
              <IonItem routerLink="/support" routerDirection="none">
                Support
              </IonItem>
              <IonItem routerLink="/logout" routerDirection="none">
                Logout
              </IonItem>
            </IonList>
          </div>
        )}
        <IonCard style={{ margin: "30px", padding: "10px" }} color="light grey">
          <IonItemGroup>
            <IonItem>
              <IonCardTitle>Competition Medals for {username}</IonCardTitle>
            </IonItem>

            <IonItem style={{ margin: "20px" }}>
              <img
                style={{
                  maxHeight: "50px",
                  borderRadius: "0%",
                  paddingRight: "20px",
                }}
                src="https://www2.deloitte.com/content/dam/Deloitte/uk/Images/promo_images/Profiles/deloitte-uk-profile.jpg"
                alt="Deloitte"
              />
              <IonLabel>Deloitte Hackathon</IonLabel>
            </IonItem>
            <IonItem style={{ margin: "20px" }}>
              <img
                style={{
                  maxHeight: "50px",
                  borderRadius: "0%",
                  paddingRight: "20px",
                }}
                src="https://clearviewpublishing.com/wp-content/uploads/2015/05/EY_Logo_Beam_RGB.jpg"
                alt="avatar"
              />
              <IonLabel>EY Case Competition</IonLabel>
            </IonItem>
            <IonItem style={{ margin: "20px" }}>
              <img
                style={{
                  maxHeight: "50px",
                  borderRadius: "0%",
                  paddingRight: "20px",
                }}
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/KPMG_logo.svg/1920px-KPMG_logo.svg.png"
                alt="KPMG"
              />
              <IonLabel>KPMG CyberSecurity Threat Competition</IonLabel>
            </IonItem>
          </IonItemGroup>
        </IonCard>
      </IonContent>
      <IonAlert
        isOpen={showAlert}
        header="Change Username"
        buttons={[
          "Cancel",
          {
            text: "Ok",
            handler: (data) => {
              setUsername(data.username);
            },
          },
        ]}
        inputs={[
          {
            type: "text",
            name: "username",
            value: username,
            placeholder: "username",
          },
        ]}
        onDidDismiss={() => setShowAlert(false)}
      />
    </IonPage>
  );
};

export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    username: state.user.username,
  }),
  mapDispatchToProps: {
    setUsername,
  },
  component: Account,
});
