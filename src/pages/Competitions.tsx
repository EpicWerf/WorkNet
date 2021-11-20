import React, { useState, useRef, useEffect } from "react";
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
} from "@ionic/react";
import { options, search } from "ionicons/icons";
import { setSearchText } from "../data/sessions/sessions.actions";
import { Schedule } from "../models/Schedule";
import "./Competitions.scss";
import AllCompetitions from "../components/AllCompetitions";
import SelectedCompetition from "../components/SelectedCompetition";
import axios from "axios";

interface OwnProps {}

interface StateProps {
  schedule: Schedule;
  favoritesSchedule: Schedule;
  mode: "ios" | "md";
}

interface DispatchProps {
  setSearchText: typeof setSearchText;
}

type CompetitionsProps = OwnProps & StateProps & DispatchProps;

const Competitions: React.FC<CompetitionsProps> = ({ setSearchText, mode }) => {
  const [segment, setSegment] = useState<"all" | "favorites">("all");
  const [showSearchbar, setShowSearchbar] = useState<boolean>(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const ionRefresherRef = useRef<HTMLIonRefresherElement>(null);
  const [showCompleteToast, setShowCompleteToast] = useState(false);
  const [selectedCompetition, setSelectedCompetition] = useState<any>();
  const [competitionId, setCompetitionId] = useState<string>("");

  const pageRef = useRef<HTMLElement>(null);
  const ios = mode === "ios";

  const doRefresh = () => {
    setTimeout(() => {
      ionRefresherRef.current!.complete();
      setShowCompleteToast(true);
    }, 2500);
  };

  const handleParentSelectedCompetitionId = async (competitionId: string) => {
    setCompetitionId(competitionId);

    // let result = await getSpecificCompetion(competitionId);
    // // result = result.toArray()
    // let arrResult: any = [result];
    // let arrpar: any = [];
    // // arrResult = arrResult.push(result);
    // console.log("result");
    // console.log(result);

    // console.log("arrResult");
    // console.log(arrResult);

    // const finalResult = arrResult.map((result: any) => ({
    //   companyName: result.companyName,
    //   competitionId: result.competitionId,
    //   competitionName: result.competitionName,
    //   details: result.details,
    //   endDate: result.endDate,
    //   imgUrl: result.imgUrl,
    //   rewards: result.rewards,
    //   rules: result.rules,
    //   startDate: result.startDate,
    //   summary: result.summary,
    //   // data: result,
    // }));
    // arrpar = arrpar.push(finalResult);
    // console.log("finalResult");
    // console.log(finalResult);

    // console.log("arrpar");
    // console.log(arrpar);
    // setSelectedCompetition(() => selectedCompetition.push([finalResult]));
    // console.log('selectedCompetition');
    // console.log(selectedCompetition);
    
    setSelectedCompetition('Value');
  };

  const getSpecificCompetion = async (competitionId: string) => {
    const url = `https://7hwyb7dwzj.execute-api.us-east-1.amazonaws.com/getCompetition?competitionId=${competitionId}`;
    try {
      const response = await axios.get(url, {
        headers: {},
      });
      return response.data.Item;
    } catch (error) {
      console.log(error);
    }
  };

  // //call this function ONCE on page load
  // useEffect(() => {
  //   getSpecificCompetion();
  // }, []);

  return (
    <IonPage ref={pageRef} id="schedule-page">
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
          {!ios && !showSearchbar && <IonTitle>Upcoming Competitions</IonTitle>}
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

        {selectedCompetition ? (
          <SelectedCompetition selectedCompetition={selectedCompetition} />
        ) : (
          <AllCompetitions
            handleParentSelectedCompetitionId={
              handleParentSelectedCompetitionId
            }
          />
        )}
      </IonContent>
    </IonPage>
  );
};

export default Competitions;
