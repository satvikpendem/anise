This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Approach

Some notes on the tech stack, this project uses Next.js which allows the server and client code to be colocated and to share types easily without needing to make a separate backend, so the functions you see in [lib](./lib/) are actually serverless functions that run on the server. This entire app is in fact a serverside only app, in order for users to not have to load a full JS bundle and so that the page itself is faster.

Regarding the approach of the actual assignment, I first cleaned up the provided mock data so that it was easily parsable by libraries, such as removing extra spaces and normalizing the capitalization of the fields. Since a lot of the data had commas in it, a CSV would not necessarily work, so I exported the mock data into a tab separated value file instead, which I then parsed with the `csvtojson` library. 

This gave back the raw data as key value pairs, but the values were still themselves raw strings with commas, so we need to fix this too. I then created a parsing function for each type of therapist property, such as name, treatment modality, etc, utilizing two functions: if the field was supposed to be one out of a set of possible values, such as gender identity (ie "gay" out of "gay, straight, lesbian" etc), I made the `parseOneField` method; otherwise, if it was multiple fields out of a set of possible fields (ie location, "CA, NY" out of "CA, NY, AL, AK, MO ..."), I made the `parseManyField` method. Both are very similar but just normalize the field for what we were looking for.

Parsing took the most time out of this assignment, but the matching for the top three therapists was fairly straightforward once we had the data in the proper format. The approach I took here was incrementing a counter for each therapist for every field that a therapist had that also matched a patient's preference. For example, if the patient wanted a therapist in CA, and NY, and the therapist was able to serve CA, NY, and MO, then the match counter incremented by 2. This is similar for the other properties of the therapist. I also allowed the patient to select "any" as an option, by leaving the checkbox group blank. This would increment the match counter by all possible values for that given property, ie 50 for the 50 US states. For example, if the user selected "any" for location, that means any therapist should be able to help them. If the user selects "any" for location but still has preferences on treatment modality for example, we can still extract the top 3, the match counter would simply look something like 53, 52, 51, and then 50 for the other therapists that didn't match the treatment modality.

The UI was done in shadcn/ui, a component library that uses Radix components and Tailwind, although I modified and wrote a lot of the Tailwind CSS code for this project to suit it to my needs.