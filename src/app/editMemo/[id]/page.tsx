import { useRouter } from 'next/navigation';

interface EditMemoFormProps {
  id: string;
  title: string;
  description: string;
}

export default function EditMemoForm({ id, title, description }: EditMemoFormProps) {
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = formData.get('title');
    const description = formData.get('description');

    try {
      const res = await fetch(`/api/memos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ title, description }),
      });

      if (!res.ok) {
        throw new Error('Failed to update memo');
      }

      router.refresh();
      router.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        placeholder="Title"
        defaultValue={title}
      />
      <textarea
        name="description"
        placeholder="Description"
        defaultValue={description}
      />
      <button type="submit">Update Memo</button>
    </form>
  );
}