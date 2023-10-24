'use client';
import React from 'react'
import { useRouter } from 'next/navigation'
// import { MafiaScenarios } from '../../dataMafiaScenarios';
import { useParams } from 'next/navigation';
import { useState } from 'react';

function Page() {
    //get url
    // const router = useRouter()
    // const useparams = useParams();

    // const senarioName: string = useparams.senarioName as string;
    // const ruleDetail: string = useparams.ruleDetail as string;

    // const urlSenarioName = decodeURIComponent(senarioName);
    // const urlRuleDetail = decodeURIComponent(ruleDetail);


    // const scenarioObject: any = MafiaScenarios.find((item) => item.title === urlSenarioName);
    // const RuleDetailObject: any = scenarioObject && scenarioObject.rules.find((item :any) => item.ruleName === urlRuleDetail);

    return (
        <>
        <div>sdasdasdasd</div>
            {/* {
                RuleDetailObject && (
                    <div>
                        <div>{RuleDetailObject.image}</div>
                        <div>{RuleDetailObject.team}</div>
                        <div>{RuleDetailObject.ruleName}</div>
                        <div>{RuleDetailObject.description}</div>

                    </div>
                )
            } */}
        </>
    )
}

export default Page