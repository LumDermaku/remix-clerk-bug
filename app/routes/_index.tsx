import { Protect, useUser } from "@clerk/remix";
import { LoaderFunctionArgs, MetaFunction, json } from "@remix-run/node";
import { getAuth } from "@clerk/remix/ssr.server";
import { useEffect, useState } from "react";

export const loader = async (args: LoaderFunctionArgs) => {
  const currentUser = await getAuth(args);
  console.log(' * user info from server* : ', currentUser);
  console.log(' * user has the permission i need from server * :', currentUser.has({ permission: 'my:custom:permission' }));
  
  return json(currentUser)
}


export default function Index() {
  const [currUser, setCurrUser] = useState<String[] | undefined>();
  const user = useUser()

  useEffect(() => {
      const userPerms = async () => {
          try {
              const res = await user.user?.getOrganizationMemberships();
              setCurrUser(res?.data?.[0]?.permissions);
          } catch (e) {
              console.error(e)
          }
      }  
      userPerms()      
  }, [])

  console.log(' current user\'s permissions: ', currUser);
  

  return (
    <Protect
        permission="my:custom:permission"
        fallback={<div>You do not have permission to access this page</div>}
      >
      <div>
        Some content
      </div>
    </Protect>
  )
}
