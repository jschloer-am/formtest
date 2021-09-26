### Notes
- Break up form into 2 sections, Header, Body. Header holds an app title or logo, Body holds form and Save button
- Utilize useReducer for managing state
- Use a wrapping container for state loading 
  - Suspense would be better, but it's still experimental, so I try to avoid it
- Do conversion in the action for unnit change
- Use select dials for all entry



### Log
- 10:30 am Initialized Repo with react-native init
- 12:30 pm Reducers in place. Basic form setup. 
  Next up: 
    - convert to storing strings [X]
    - save and restore [X]
    - Testing [X]
    
I am somewhat confused because the task says to use numberic keyboard input, but the clarification I got was to use a dial. I'm going to make the call to use a dial for the imperial height measurement, and text inputs for the rest I guess.
Rereading, I believe the response I got was a typo meant to say dual inputs, rather than a dial, I'm going to move forward with that assumption.

- 1:30 pm 3 hours up. Functionality seems good. Next up need to add unit tests and Style things up a bit
- 2:30 pm Basic testing is in place, Having to move away from the segmented control. It is better looking, but it's a native control on iOS, which makes testing very difficult since I can't trigger the change event. react native picker should do this better.

### Questions
- I'm just realizing that the units control says multi-select, vs select. I'm not sure how the interface would work with a multiselect(show both imperial and metric at the smae time?), so I'm going to go on the assumption that that should say Select and will check on this later.
