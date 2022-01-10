import { createContext, useContext, useRef } from "react";

const initState = {
  connect: (url: string) => new WebSocket(url)
}

const WebsocketContext = createContext(initState)

export const WebsocketContextProvider = (props: any ) => {

  const connection = useRef<WebSocket>()

  const connect = (url: string) => {

    connection.current = new WebSocket(url)

    return connection.current
  }

  return (<WebsocketContext.Provider value={{connect}}>
		{props.children}
  </WebsocketContext.Provider>);
}

export const useWebsocketContext = () => useContext(WebsocketContext);