import {
  IonCard,
  IonItemGroup,
  IonCardTitle,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonItem,
  IonLabel,
  IonButton,
} from "@ionic/react";
import React from "react";

const SelectedCompetition: React.FC<{
  selectedCompetition: any;
}> = (props) => {
  const { selectedCompetition } = props;

  return (
    <IonCard style={{ margin: "30px", padding: "10px" }} color="light grey">
      <IonItemGroup>
        <IonCard>
          <IonCardTitle style={{ padding: "20px" }}>More Details</IonCardTitle>
        </IonCard>

        <IonCard>
          <img src="https://blackdirectory.com/custom/domain_1/image_files/2441_photo_9398.jpg" />
          <IonCardHeader>
            <IonCardTitle>WorkNet - WorkNet Competition</IonCardTitle>
          </IonCardHeader>
          <IonItem>
            <IonCardContent>
              WorkNet is excited to kick off their first competition for
              Software Engineers. Have fun with this challenge while learning
              new skills that employers value!
            </IonCardContent>
          </IonItem>

          <IonItem>
            <IonCardContent>Start Date: 2021-12-20</IonCardContent>
            <IonCardContent>End Date: 2021-12-30</IonCardContent>
          </IonItem>

          <IonItem>
            <IonCardContent>
              This competition presents common software engineering problems
              that are applicable in the real world. Do not worry about silly
              and useless challenges, we hope that you will be able to build
              something to show off to potential employers. Using your language
              of choice, you will learn how to solve common problems!
            </IonCardContent>
          </IonItem>

          <IonItem>
            <IonCardContent>
              Rewards: 1st Place: $5,000\nParticipants will be eligible for
              interviews and positions with Worknet.
            </IonCardContent>
          </IonItem>
          
          <IonItem>
                <IonButton
                  size="default"
                  slot="end"
                >
                  Join
                </IonButton>
              </IonItem>

        </IonCard>

        {/* {competitions ? (
            competitions.map((competition: any, index) => (
              <IonCard key={competition.competitionId}>
                <IonCardHeader>
                  <IonCardTitle>{competition.companyName}</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>{competition.summary} </IonCardContent>
                <IonItem>
                  <IonButton
                    competition-id={competition.competitionId}
                    size="default"
                    slot="end"
                    onClick={handleJoin}
                  >
                    Join
                  </IonButton>
                </IonItem>
              </IonCard>
            ))
          ) : (
            <IonItem>
              <IonLabel>No competitions to display</IonLabel>
            </IonItem>
          )} */}
      </IonItemGroup>
    </IonCard>
  );
};

export default SelectedCompetition;
