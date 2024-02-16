const lh = "http://localhost:4000"
const headers = {
  "Content-Type": "application/json"
}

test("/getAllNotes - Return list of zero notes for getAllNotes", async () => {
  // Code here
  await fetch(`http://localhost:4000/deleteAllNotes`, {
    method: "DELETE",
    headers: headers,
  })
  const res = await fetch(lh + "/getAllNotes")
  expect(res.status).toBe(200);
  const data = await res.json()
  expect(data.response.length).toBe(0)
});

test("/getAllNotes - Return list of two notes for getAllNotes", async () => {
  // Code here
  await fetch(`http://localhost:4000/deleteAllNotes`, {
    method: "DELETE",
    headers: headers,
  })
  await fetch("http://localhost:4000/postNote",{
    method: "POST",
    headers: headers,
    body: JSON.stringify({title: "note1", content: "body1"})
  })
  await fetch("http://localhost:4000/postNote",{
    method: "POST",
    headers: headers,
    body: JSON.stringify({title: "note2", content: "body2"})
  })
  const res = await fetch(lh + "/getAllNotes");
  expect(res.status).toBe(200);
  const data = await res.json();
  console.log(data.response);
  expect(data.response.length).toBe(2);
});

test("/deleteNote - Delete a note", async () => {
  // Code here
  await fetch(`http://localhost:4000/deleteAllNotes`, {
    method: "DELETE",
    headers: headers,
  })
  await fetch("http://localhost:4000/postNote",{
    method: "POST",
    headers: headers,
    body: JSON.stringify({title: "note1", content: "body1"})
  })
  const notes = await fetch("http://localhost:4000/getAllNotes").then(res => res.json());
  const id = notes.response[0]._id;
  const res = await fetch(lh + "/deleteNote/" + id, {
    method: "DELETE",
    headers: headers
  });
  expect(res.status).toBe(200);
  const data = await res.json()
  expect(data.response).toBe(`Document with ID ${id} deleted.`);
});

test("/patchNote - Patch with content and title", async () => {
  // Code here
  await fetch(`http://localhost:4000/deleteAllNotes`, {
    method: "DELETE",
    headers: headers,
  })
  await fetch("http://localhost:4000/postNote",{
    method: "POST",
    headers: headers,
    body: JSON.stringify({title: "note1", content: "body1"})
  })
  const notes = await fetch("http://localhost:4000/getAllNotes").then(res => res.json());
  const id = notes.response[0]._id;
  const res = await fetch(lh + "/patchNote/" + id, {
    method: "PATCH",
    headers: headers,
    body: JSON.stringify({title: "note2", body: "body2"})
  });
  expect(res.status).toBe(200);
  const data = await res.json()
  expect(data.response).toBe(`Document with ID ${id} patched.`);
});

test("/patchNote - Patch with just title", async () => {
  // Code here
  await fetch(`http://localhost:4000/deleteAllNotes`, {
    method: "DELETE",
    headers: headers,
  })
  await fetch("http://localhost:4000/postNote",{
    method: "POST",
    headers: headers,
    body: JSON.stringify({title: "note1", content: "body1"})
  })
  const notes = await fetch("http://localhost:4000/getAllNotes").then(res => res.json());
  const id = notes.response[0]._id;
  const res = await fetch(lh + "/patchNote/" + id, {
    method: "PATCH",
    headers: headers,
    body: JSON.stringify({title: "note2"})
  });
  expect(res.status).toBe(200);
  const data = await res.json()
  expect(data.response).toBe(`Document with ID ${id} patched.`);
});

test("/patchNote - Patch with just content", async () => {
  // Code here
  await fetch(`http://localhost:4000/deleteAllNotes`, {
    method: "DELETE",
    headers: headers,
  });
  await fetch("http://localhost:4000/postNote",{
    method: "POST",
    headers: headers,
    body: JSON.stringify({title: "note1", content: "body1"})
  });
  const notes = await fetch("http://localhost:4000/getAllNotes").then(res => res.json());
  const id = notes.response[0]._id;
  const res = await fetch(lh + "/patchNote/" + id, {
    method: "PATCH",
    headers: headers,
    body: JSON.stringify({content: "body2"})
  });
  expect(res.status).toBe(200);
  const data = await res.json()
  expect(data.response).toBe(`Document with ID ${id} patched.`);
});

test("/deleteAllNotes - Delete one note", async () => {
  // Code here
  await fetch(`http://localhost:4000/deleteAllNotes`, {
    method: "DELETE",
    headers: headers,
  })
  await fetch("http://localhost:4000/postNote",{
    method: "POST",
    headers: headers,
    body: JSON.stringify({title: "note1", content: "body1"})
  })
  const res = await fetch(`http://localhost:4000/deleteAllNotes`, {
    method: "DELETE",
    headers: headers,
  })
  expect(res.status).toBe(200);
  const data = await res.json()
  expect(data.response).toBe("1 note(s) deleted.");
});

test("/deleteAllNotes - Delete three notes", async () => {
  // Code here
  await fetch(`http://localhost:4000/deleteAllNotes`, {
    method: "DELETE",
    headers: headers,
  })
  await fetch("http://localhost:4000/postNote",{
    method: "POST",
    headers: headers,
    body: JSON.stringify({title: "note1", content: "body1"})
  })
  await fetch("http://localhost:4000/postNote",{
    method: "POST",
    headers: headers,
    body: JSON.stringify({title: "note2", content: "body2"})
  })
  await fetch("http://localhost:4000/postNote",{
    method: "POST",
    headers: headers,
    body: JSON.stringify({title: "note3", content: "body3"})
  })
  const res = await fetch(`http://localhost:4000/deleteAllNotes`, {
    method: "DELETE",
    headers: headers,
  })
  expect(res.status).toBe(200);
  const data = await res.json()
  expect(data.response).toBe("3 note(s) deleted.");
});

test("/updateNoteColor - Update color of a note to red (#FF0000)", async () => {
  // Code here
  await fetch(`http://localhost:4000/deleteAllNotes`, {
    method: "DELETE",
    headers: headers,
  })
  await fetch("http://localhost:4000/postNote",{
    method: "POST",
    headers: headers,
    body: JSON.stringify({title: "note1", content: "body1"})
  })
  const notes = await fetch("http://localhost:4000/getAllNotes").then(res => res.json());
  const id = notes.response[0]._id;
  const res = await fetch(lh + "/updateNoteColor/" + id, {
    method: "PATCH",
    headers: headers,
    body: JSON.stringify({color: "#FF0000"})
  });
  expect(res.status).toBe(200);
  const data = await res.json()
  expect(data.message).toBe(`Note color updated successfully.`);
});