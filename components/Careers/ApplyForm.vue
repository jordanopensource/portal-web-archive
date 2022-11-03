<template>
  <form
    class="bg-josa-warm-grey p-4"
    autocomplete="on"
    @submit.prevent="submitForm"
  >
    <div>
      <div class="input-control">
        <label for="firstName">First Name*:</label>
        <input
          id="firstName"
          v-model="personal_information.first_name"
          type="text"
          name="firstName"
          value="John"
          required
        />
      </div>
      <div class="input-control">
        <label for="lastName">Last name*:</label>
        <input
          id="lastName"
          v-model="personal_information.last_name"
          type="text"
          name="lastName"
          value="John"
          required
        />
      </div>
      <div class="input-control">
        <label for="email">Email*:</label>
        <input
          id="email"
          v-model="personal_information.email"
          type="email"
          name="email"
          value="John@example.com"
          required
        />
      </div>
      <div class="input-control">
        <label for="phone">Phone:</label>
        <input
          id="phone"
          v-model="personal_information.phone"
          type="tel"
          name="phone"
          value="00962"
        />
      </div>
      <div class="input-control">
        <label for="resume">Resume/CV*:</label>
        <input id="resume" type="file" name="resume" />
      </div>
      <div class="input-control">
        <label for="coverLetter">Cover Letter*:</label>
        <textarea
          id="coverLetter"
          v-model="professional_information.cover_letter"
          name="coverLetter"
          cols="30"
          rows="10"
          required
        ></textarea>
      </div>
      <div class="input-control">
        <label for="linkedInProfile">LinkedIn Profile:</label>
        <input
          id="linkedInProfile"
          v-model="professional_information.linkedin_profile"
          type="url"
          name="linkedInProfile"
          value=""
        />
      </div>
      <div class="input-control">
        <label for="website">Website:</label>
        <input
          id="website"
          v-model="professional_information.website"
          type="url"
          name="website"
          value=""
        />
      </div>
      <div class="input-control">
        <label for="whenCanStart">When can you start?</label>
        <input
          id="whenCanStart"
          v-model="questions.when_can_start"
          type="Date"
          name="whenCanStart"
        />
      </div>
      <div class="input-control">
        <label for="salaryDesired">Salary Desired:</label>
        <input
          id="salaryDesired"
          v-model="questions.salary_desired"
          type="text"
          name="salaryDesired"
        />
      </div>
      <div class="input-control options">
        <p>Are you currently employed?</p>
        <input
          id="currentlyEmployed_yes"
          v-model="questions.currently_employed"
          type="radio"
          name="currentlyEmployed"
          :value="true"
        />
        <label for="currentlyEmployed_yes">Yes</label>
        <input
          id="currentlyEmployed_no"
          v-model="questions.currently_employed"
          type="radio"
          name="currentlyEmployed"
          :value="false"
        />
        <label for="currentlyEmployed_no">No</label>
      </div>
      <div class="input-control options">
        <p>If so, can we inquire your current employer?</p>
        <input
          id="inquire_yes"
          v-model="questions.inquire_current_employer"
          type="radio"
          name="inquire"
          :value="true"
        />
        <label for="inquire_yes">Yes</label>
        <input
          id="inquire_no"
          v-model="questions.inquire_current_employer"
          type="radio"
          name="inquire"
          :value="false"
        />
        <label for="inquire_no">No</label>
      </div>
      <div class="input-control options">
        <p>Have you ever applied to JOSA before?</p>
        <input
          id="appliedBefore_yes"
          v-model="questions.applied_to_josa_before"
          type="radio"
          name="appliedBefore"
          :value="true"
        />
        <label for="appliedBefore_yes">Yes</label>
        <input
          id="appliedBefore_no"
          v-model="questions.applied_to_josa_before"
          type="radio"
          name="appliedBefore"
          :value="false"
        />
        <label for="appliedBefore_no">No</label>
      </div>
      <div class="input-control options">
        <p>Are you a JOSA Member?</p>
        <input
          id="josaMember_yes"
          v-model="questions.josa_member"
          type="radio"
          name="josaMember"
          :value="true"
        />
        <label for="josaMember_yes">Yes</label>
        <input
          id="josaMember_no"
          v-model="questions.josa_member"
          type="radio"
          name="josaMember"
          :value="false"
        />
        <label for="josaMember_no">No</label>
      </div>
      <div class="input-control">
        <label for="referredBy"
          >If referred by a current JOSA employee, please tell us who.</label
        >
        <input
          id="referredBy"
          v-model="questions.referred_by"
          type="text"
          name="referredBy"
        />
      </div>
      <div class="input-control options">
        <p>
          Do you give consent to JOSA to process your personal information in
          accordance to our
          <NuxtLink
            target="_blank"
            to="/info/privacypolicy#introduction-privacy"
            >Privacy Policy</NuxtLink
          >?
        </p>
        <input
          id="consent_yes"
          v-model="consent"
          type="radio"
          name="consent"
          :value="true"
        />
        <label for="consent_yes">Yes</label>
        <input
          id="consent_no"
          v-model="consent"
          type="radio"
          name="consent"
          :value="false"
        />
        <label for="consent_no">No</label>
      </div>
      <div>
        <AppButton class="input-control" btn-style="button-flat"
          ><p>Apply</p></AppButton
        >
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: 'ApplyForm',
  components: {
    AppButton: () => import('@/components/FormComponents/AppButton'),
  },
  props: {
    careerObject: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      selectedFile: null,
      setSelectedFile: null,
      consent: null,
      personal_information: {
        first_name: null,
        last_name: null,
        email: null,
        phone: null,
      },
      professional_information: {
        cover_letter: null,
        linkedin_profile: null,
        website: null,
        resume: null,
      },
      questions: {
        career_types: [],
        when_can_start: null,
        salary_desired: null,
        currently_employed: null,
        inquire_current_employer: null,
        applied_to_josa_before: null,
        josa_member: null,
        referred_by: null,
      },
      career: this.careerObject.id,
    }
  },
  methods: {
    submitForm() {
      console.log({
        personal_information: this.personal_information,
        professional_information: this.professional_information,
        questions: this.questions,
        career: this.career,
        consent: this.consent,
      })
      if (this.consent === true) {
        try {
          this.$axios({
            method: 'post',
            url: 'http://localhost:1337/job-applications',
            data: {
              personal_information: this.personal_information,
              professional_information: this.professional_information,
              questions: this.questions,
              career: this.career,
            },
          })
          console.log(`applied to job!!`)
        } catch (err) {
          console.log(err)
        }
      }
    },
  },
}
</script>

<style lang="postcss" scoped>
input {
  @apply w-full p-4 rounded-sm;
}

input::placeholder {
  @apply text-josa-warm-grey-dark;
}

textarea::placeholder {
  @apply text-josa-warm-grey-dark;
}

label {
  @apply block;
}

.input-control {
  @apply m-6;
}
.input-control input,
.input-control textarea {
  @apply block w-full box-border p-2 mb-4 border-gray-400 border border-solid;
  font: inherit;
}

.input-control input:focus,
.input-control textarea:focus {
  @apply bg-gray-100;
  outline: none;
}
.options label,
.options input {
  @apply inline-block w-auto mr-1;
}

.options label:first-of-type {
  @apply mr-4;
}
</style>
