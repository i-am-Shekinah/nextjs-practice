export default function UserIdPage({ params }: { params: { id: string } }) {
  const { id } = params;
  return (
    <>
      <h1>USER PROFILE {id}</h1>
    </>
  );
}
