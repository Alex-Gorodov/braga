import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../../store/root-reducer";
import { useEffect, useState } from "react";
import { User } from "../../types/user";
import { Spinner } from "../../components/spinner/spinner";
import { Layout } from "../../components/layout/layout";
import { Helmet } from "react-helmet-async";
import { UserPageItem } from "../../components/user-page-item/user-page-item";

export function UserPage(): JSX.Element {
  const { id } = useParams();
  const users = useSelector((state: RootState) => state.data.users);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const itemId = id;
    const foundUser = users.find((user) => user.id === itemId);
    if (foundUser) {
      setUser(foundUser)
    } else {
      setUser(null)
    }
    setIsLoading(false);
  }, [id, users])

  if (isLoading) {
    return <Spinner size={"40"} wrapper/>
  }

  return (
    <Layout>
      <Helmet>
        <title>{`User | ${user?.name}`}</title>
      </Helmet>
      {
        user ? <UserPageItem user={user}/> : <Spinner size={"40"} wrapper/>
      }
    </Layout>
  )
}
