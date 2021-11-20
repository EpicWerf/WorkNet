import {
  IonCard,
  IonItemGroup,
  IonCardTitle,
  IonCardHeader,
  IonCardContent,
  IonItem,
  IonButton,
  IonLabel,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import axios from "axios";

const AllCompetitions: React.FC<{
    handleParentSelectedCompetitionId: Function;
}> = (props) => {
  const { handleParentSelectedCompetitionId } = props;
  const [competitions, setCompetitions] = useState<[{}]>();

  const getCompetions = async () => {
    const url =
      "https://7hwyb7dwzj.execute-api.us-east-1.amazonaws.com/allCompetitions";
    try {
      const response = await axios.get(url, {
        headers: {},
      });
      setCompetitions(response.data);

      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  //call this function ONCE on page load
  useEffect(() => {
    getCompetions();
  }, []);

  const handleJoin = (event: any) => {
    handleParentSelectedCompetitionId(event.target["competition-id"]);
  };

  return (
    <IonCard style={{ margin: "30px", padding: "10px" }} color="light grey">
      <IonItemGroup>
        <IonCard>
          <IonCardTitle style={{ padding: "20px" }}>
            Upcoming Competitions You Might Be Interested In:
          </IonCardTitle>
        </IonCard>
        {competitions ? (
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
                  More Info
                </IonButton>
              </IonItem>
            </IonCard>
          ))
        ) : (
          <IonItem>
            <IonLabel>No competitions to display</IonLabel>
          </IonItem>
        )}
      </IonItemGroup>
    </IonCard>
  );
};

export default AllCompetitions;
