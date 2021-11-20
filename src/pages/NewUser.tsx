import React, { useState, useRef } from "react";
import {
  IonToolbar,
  IonContent,
  IonPage,
  IonButtons,
  IonTitle,
  IonMenuButton,
  IonSegment,
  IonButton,
  IonIcon,
  IonSearchbar,
  IonRefresher,
  IonRefresherContent,
  IonToast,
  IonHeader,
  IonCard,
  IonItem,
  IonLabel,
  IonCardTitle,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonItemDivider,
  IonItemGroup,
  IonCardHeader,
  IonAlert,
  useIonAlert,
} from "@ionic/react";
import { options, search } from "ionicons/icons";
import { setSearchText } from "../data/sessions/sessions.actions";
import { Schedule } from "../models/Schedule";
import "./NewUser.scss";
import axios, { AxiosResponse } from "axios";
import { Redirect } from "react-router";

interface OwnProps {}

interface StateProps {
  schedule: Schedule;
  favoritesSchedule: Schedule;
  mode: "ios" | "md";
}

interface DispatchProps {
  setSearchText: typeof setSearchText;
}

type NewUserProps = OwnProps & StateProps & DispatchProps;

const NewUser: React.FC<NewUserProps> = ({ setSearchText, mode }) => {
  const [segment, setSegment] = useState<"all" | "favorites">("all");
  const [showSearchbar, setShowSearchbar] = useState<boolean>(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const ionRefresherRef = useRef<HTMLIonRefresherElement>(null);
  const [showCompleteToast, setShowCompleteToast] = useState(false);

  // ####### COLLECT INFORMATION ABOUT THE USER AND STORE IT IN STATE ########
  const [userEmail, setUserEmail] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [birthdate, setBirthdate] = useState<string>("");
  const [university, setUniversity] = useState<string>("");
  const [generalInterest, setGeneralInterest] = useState<string>("");
  const [specificInterest, setSpecificInterest] = useState<string>("");
  const [skills, setSkills] = useState<string[]>([""]);
  const [competitions, setCompetitions] = useState<string[]>([""]);

  const pageRef = useRef<HTMLElement>(null);
  const ios = mode === "ios";
  const [present] = useIonAlert();

  const doRefresh = () => {
    setTimeout(() => {
      ionRefresherRef.current!.complete();
      setShowCompleteToast(true);
    }, 2500);
  };

  //this functions handles keyboard input when a user edits the text for the given provider
  const handleSkillChange = (event: any) => {
    event.preventDefault();

    const newSkill = event.target.value;
    const index: number = event.target["skill-index"];

    const copy = skills;

    try {
      copy[index] = newSkill;
      setSkills([...skills]);
    } catch (error) {
      console.log(error);
    }
  };

  //adds a new, blank skill to a skill array when a user clicks the blue "Add Skill" button
  const addSkill = () => {
    //create the blank skill
    const newSkill = "";

    //concatenate the new skill to the skill arry
    setSkills(() => skills.concat([newSkill]));
  };

  //removes the last skill when a user clicks the red "remove skill" button
  const removeSkill = () => {
    //set up a new list which is just a copy of the old list
    let copy = skills;

    //if there is more than one skill, remove the last skill in the array
    if (skills.length > 1) {
      copy = skills.slice(0, copy.length - 1);
    } else {
      //if there is only one skill, alert the user and do nothing
      alert("Cannot remove the first skill");
    }

    //send the copy with one less skill to state
    setSkills(copy);
  };



  const SubmitForm = async () => {
    
    const userObject = {
      "userEmail": userEmail,
      "firstName": firstName,
      "lastName": lastName,
      "birthdate": birthdate,
      "university": university,
      "generalInterest": generalInterest,
      "specificInterest": specificInterest,
      "skills": skills,
      "competitions": competitions,
    };
    const url = `https://7hwyb7dwzj.execute-api.us-east-1.amazonaws.com/createUser`;
    try {
      const response = await axios.post(url, userObject, {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Accept": "application/json",
          "Accept-Charset": "UTF-8",
          "connection": "keep-alive",
          "Access-Control-Allow-Origin": "*",
          // Authorization: "Bearer " + process.env.ADOBE_AUTH_TOKEN,
        },
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <IonPage ref={pageRef} id="new-user-page">
        <IonHeader translucent={true}>
          <IonToolbar>
            {!showSearchbar && (
              <IonButtons slot="start">
                <IonMenuButton />
              </IonButtons>
            )}
            {ios && (
              <IonSegment
                value={segment}
                onIonChange={(e) => setSegment(e.detail.value as any)}
              ></IonSegment>
            )}
            {!ios && !showSearchbar && <IonTitle>Create New Account</IonTitle>}
            {showSearchbar && (
              <IonSearchbar
                showCancelButton="always"
                placeholder="Search"
                onIonChange={(e: CustomEvent) => setSearchText(e.detail.value)}
                onIonCancel={() => setShowSearchbar(false)}
              ></IonSearchbar>
            )}

            <IonButtons slot="end">
              {!ios && !showSearchbar && (
                <IonButton onClick={() => setShowSearchbar(true)}>
                  <IonIcon slot="icon-only" icon={search}></IonIcon>
                </IonButton>
              )}
              {!showSearchbar && (
                <IonButton onClick={() => setShowFilterModal(true)}>
                  {mode === "ios" ? (
                    "Filter"
                  ) : (
                    <IonIcon icon={options} slot="icon-only" />
                  )}
                </IonButton>
              )}
            </IonButtons>
          </IonToolbar>
        </IonHeader>

        <IonContent fullscreen={true}>
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">Create New Account</IonTitle>
            </IonToolbar>
            <IonToolbar>
              <IonSearchbar
                placeholder="Search"
                onIonChange={(e: CustomEvent) => setSearchText(e.detail.value)}
              ></IonSearchbar>
            </IonToolbar>
          </IonHeader>

          <IonRefresher
            slot="fixed"
            ref={ionRefresherRef}
            onIonRefresh={doRefresh}
          >
            <IonRefresherContent />
          </IonRefresher>

          <IonToast
            isOpen={showCompleteToast}
            message="Refresh complete"
            duration={2000}
            onDidDismiss={() => setShowCompleteToast(false)}
          />

          <IonCard
            style={{ margin: "30px", padding: "10px" }}
            color="light grey"
          >
            <IonItemGroup>
              <IonItemDivider>
                <IonCardTitle>
                  Let's get to know a little more about you!
                </IonCardTitle>
              </IonItemDivider>

              {/* ############## INFORMATION ABOUT THE USER ############## */}

              <IonItem>
                <IonLabel position="floating">Email</IonLabel>
                <IonInput
                  value={userEmail}
                  placeholder="Enter your email here..."
                  onIonChange={(e) => setUserEmail(e.detail.value!)}
                  clearInput
                ></IonInput>
              </IonItem>

              <IonItem>
                <IonLabel position="floating">First Name</IonLabel>
                <IonInput
                  value={firstName}
                  placeholder="Enter your first name here..."
                  onIonChange={(e) => setFirstName(e.detail.value!)}
                  clearInput
                ></IonInput>
              </IonItem>

              <IonItem>
                <IonLabel position="floating">Last Name</IonLabel>
                <IonInput
                  value={lastName}
                  placeholder="Enter your last name here..."
                  onIonChange={(e) => setLastName(e.detail.value!)}
                  clearInput
                ></IonInput>
              </IonItem>

              <IonItem style={{ paddingBottom: "50px" }}>
                <IonLabel position="fixed">Date Of Birth</IonLabel>
                <IonInput
                  type="date"
                  value={birthdate}
                  onIonChange={(e) => setBirthdate(e.detail.value!)}
                  clearInput
                ></IonInput>
              </IonItem>
            </IonItemGroup>

            {/* ############## INFORMATION ABOUT THE UNIVERSITY ############## */}

            <IonItemGroup>
              <IonItemDivider>
                <IonCardTitle>Tell us about your university:</IonCardTitle>
              </IonItemDivider>
              <IonItem>
                <IonLabel position="floating">University Name</IonLabel>
                <IonInput
                  value={university}
                  placeholder="Enter your university name here..."
                  onIonChange={(e) => setUniversity(e.detail.value!)}
                  clearInput
                ></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel position="floating">Intended Major</IonLabel>
                <IonInput
                  value={generalInterest}
                  placeholder="Enter your intended major here..."
                  onIonChange={(e) => setGeneralInterest(e.detail.value!)}
                  clearInput
                ></IonInput>
              </IonItem>
              <IonItem style={{ paddingBottom: "50px" }}>
                <IonLabel>Industry of Interest:</IonLabel>
                <IonSelect
                  value={competitions}
                  onIonChange={(e) => setCompetitions(e.detail.value!)}
                >
                  <IonSelectOption value="Technology">
                    Technology
                  </IonSelectOption>
                  <IonSelectOption value="Accounting">
                    Accounting
                  </IonSelectOption>
                  <IonSelectOption value="Finance">Finance</IonSelectOption>
                  <IonSelectOption value="Marketing">Marketing</IonSelectOption>
                </IonSelect>
              </IonItem>
            </IonItemGroup>

            {/* ############## INFORMATION ABOUT INTERESTS OR SKILLS ############## */}

            <IonItemGroup>
              <IonItemDivider>
                <IonCardTitle>
                  A little more about your interests and skills:
                </IonCardTitle>
              </IonItemDivider>
              <IonItem>
                <IonLabel>Work Related Interests</IonLabel>
                <IonSelect
                  value={specificInterest}
                  onIonChange={(e) => setSpecificInterest(e.detail.value!)}
                >
                  <IonSelectOption value="Engineering">
                    Engineering
                  </IonSelectOption>
                  <IonSelectOption value="Product Management">
                    Product Management
                  </IonSelectOption>
                  <IonSelectOption value="IT">IT</IonSelectOption>
                  <IonSelectOption value="Analytics">Analytics</IonSelectOption>
                </IonSelect>
              </IonItem>
              {skills.map((skill, index) => (
                <IonItem key={"skill" + index}>
                  <IonLabel position="floating">{`Skill ${
                    index + 1
                  }`}</IonLabel>
                  <IonInput
                    value={skills[index]}
                    skill-index={index}
                    onIonChange={handleSkillChange}
                    placeholder={`Enter Skill ${index + 1} here...`}
                  ></IonInput>
                </IonItem>
              ))}
            </IonItemGroup>

            <IonItem>
              <IonButton size="default" onClick={removeSkill} color="danger">
                Remove skill
              </IonButton>
              <IonButton size="default" onClick={addSkill}>
                Add Skill
              </IonButton>
            </IonItem>

            <IonButton
            expand="block"
            onClick={() =>
              present({
              cssClass: 'my-css',
              header: 'Congrats! You\'re almost there!',
              // message: 'Continue to create your username and password!',
              buttons: [
                'Cancel',
                { text: 'Sign Me Up!', handler: (d) => console.log("button submitted") },
              ],
              onDidDismiss: (e) => console.log('did dismiss'),
            })
          }
        >
          Submit
        </IonButton>
          </IonCard>
        </IonContent>
      </IonPage>
    </>
  );
};

export default NewUser;
