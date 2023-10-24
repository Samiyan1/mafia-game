'use client';
import React from 'react'
import { useParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { setFinalList } from '@/app/redux/reducers/ruleAndplayers';

function Page() {
    //get state 
    const selectorFinalList = useSelector(setFinalList);
    const finalListState = selectorFinalList.payload.ruleAndPlayersSlice.finalList;
    const newFinalList = [...finalListState];
    // get url
    const useparams = useParams();
    const playerDetail: string = useparams.playerDetail as string;
    const urlPlayerDetail = decodeURIComponent(playerDetail);

    //FIND PLAYER
    const scenarioObject: any = newFinalList.find((item) => item.playerName === urlPlayerDetail);
    // const PlayerDetailObject: any = scenarioObject && scenarioObject.rules.find((item: any) => item.playerName === urlPlayerDetail);


    console.log(scenarioObject)
    // console.log(PlayerDetailObject)
    return (
        <div>
            {
                scenarioObject && (
                    <div>
                        <div>{scenarioObject.playerName}</div>
                        <div>{scenarioObject.image}</div>
                        <div>{scenarioObject.team}</div>
                        <div>{scenarioObject.ruleName}</div>
                        <div>{scenarioObject.description}</div>

                    </div>
                )
            }
        </div>
    )
}

export default Page