
import React, { useEffect } from 'react';
import { useState } from 'react';

export default function useLocalData(finalListStateProp: any[]) {

    const [finalListState, setFinalListState] = useState([...finalListStateProp]);

    useEffect(() => {
        if (typeof window !== "undefined") {
          const storedItems: any = JSON.parse(window.localStorage.getItem('localPlayerList') || '');
    
          if (storedItems && storedItems.length >= 4) {
    
            setFinalListState([...storedItems])

        } else {
            window.localStorage.setItem('localPlayerList', JSON.stringify(finalListState))
          }
        }
    
      }, [])

    // function removeLocalData() {
    //     localStorage.setItem('localPlayerList', JSON.stringify(''))
    //     routre.push('/stepOne')
    // }

    return  finalListState
}
